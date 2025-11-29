from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.zip_lookup import ZipLookupService
from app.services.mock_data import get_mock_data

zip_service = ZipLookupService()

app = FastAPI(
    title="Urban Legend API",
    description="Location-based travel and storytelling dashboard API",
    version="0.1.0",
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "urban-legend-api"}


@app.get("/api/town")
async def get_town(zip: str):
    if len(zip) != 5 or not zip.isdigit():
        raise HTTPException(status_code=400, detail="Invalid ZIP code format")

    town_data = await zip_service.lookup(zip)
    if not town_data:
        raise HTTPException(status_code=404, detail="ZIP code not found")

    places = get_mock_data(zip)
    return {
        "town": town_data,
        "hotels": places["hotels"],
        "restaurants": places["restaurants"],
        "activities": places["activities"],
        "legend": places["legend"],
    }

