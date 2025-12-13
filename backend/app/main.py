from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.db import get_db, init_db
from app.services.zip_lookup import ZipLookupService
from app.services.yelp_service import yelp_service
from app.services.mock_data import get_mock_data
from app.services.news_service import news_service
from app.services.legend_service import legend_service
from app.services.weather_service import WeatherService
from app.repositories import TownRepository, LegendRepository

zip_service = ZipLookupService()
weather_service = WeatherService()

app = FastAPI(title="Urban Legend API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "urban-legend-api"}


@app.get("/api/town")
async def get_town(zip: str, db: Session = Depends(get_db)):
    if len(zip) != 5 or not zip.isdigit():
        raise HTTPException(status_code=400, detail="Invalid ZIP code format")

    town_repo = TownRepository(db)
    legend_repo = LegendRepository(db)
    town = town_repo.get_by_zip(zip)

    if town and town_repo.has_fresh_places(town):
        places = town_repo.get_places(town)
        existing_legend = legend_repo.get_by_town(town.id)
        legend = existing_legend.story if existing_legend else await legend_service.generate(town.city, town.state)
        if not existing_legend:
            legend_repo.create(town.id, legend)
        return {
            "town": town.to_dict(),
            "hotels": places["hotels"],
            "restaurants": places["restaurants"],
            "activities": places["activities"],
            "legend": legend,
        }

    town_data = await zip_service.lookup(zip)
    if not town_data:
        raise HTTPException(status_code=404, detail="ZIP code not found")

    town = town_repo.get_or_create(town_data)
    places = await yelp_service.get_all_places(town_data["lat"], town_data["lon"], limit=15)

    if places["hotels"] or places["restaurants"]:
        town_repo.save_places(town, places)

    existing_legend = legend_repo.get_by_town(town.id)
    if existing_legend:
        legend = existing_legend.story
    else:
        legend = await legend_service.generate(town.city, town.state)
        legend_repo.create(town.id, legend)

    if not places["hotels"] and not places["restaurants"]:
        mock = get_mock_data(zip)
        places = {
            "hotels": mock["hotels"],
            "restaurants": mock["restaurants"],
            "activities": mock["activities"],
        }

    return {
        "town": town.to_dict(),
        "hotels": places["hotels"],
        "restaurants": places["restaurants"],
        "activities": places["activities"],
        "legend": legend,
    }


@app.get("/api/trending-news")
async def get_trending_news(city: str = Query(...)):
    if not city or len(city.strip()) < 2:
        raise HTTPException(status_code=400, detail="Invalid city name")
    articles = await news_service.get_news(city.strip(), limit=12)
    return {"articles": articles}


@app.post("/api/regenerate-legend")
async def regenerate_legend(zip: str = Query(...), db: Session = Depends(get_db)):
    if len(zip) != 5 or not zip.isdigit():
        raise HTTPException(status_code=400, detail="Invalid ZIP code format")

    town_repo = TownRepository(db)
    legend_repo = LegendRepository(db)
    town = town_repo.get_by_zip(zip)

    if not town:
        raise HTTPException(status_code=404, detail="Town not found")

    legend_repo.delete_by_town(town.id)
    new_legend = await legend_service.generate(town.city, town.state)
    legend_repo.create(town.id, new_legend)

    return {"legend": new_legend}


@app.get("/api/weather")
async def get_weather(lat: float = Query(...), lon: float = Query(...)):
    weather = await weather_service.get_weather(lat, lon)
    if not weather:
        raise HTTPException(status_code=503, detail="Weather service unavailable")
    return weather

