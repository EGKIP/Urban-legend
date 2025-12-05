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
from app.repositories import TownRepository

zip_service = ZipLookupService()

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

    repo = TownRepository(db)
    town = repo.get_by_zip(zip)

    if town and repo.has_fresh_places(town):
        places = repo.get_places(town)
        legend = get_mock_data(zip).get("legend")
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

    town = repo.get_or_create(town_data)
    places = await yelp_service.get_all_places(town_data["lat"], town_data["lon"], limit=15)

    if places["hotels"] or places["restaurants"]:
        repo.save_places(town, places)
        legend = get_mock_data(zip).get("legend")
    else:
        mock = get_mock_data(zip)
        places = {
            "hotels": mock["hotels"],
            "restaurants": mock["restaurants"],
            "activities": mock["activities"],
        }
        legend = mock["legend"]

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

