from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    # Placeholder response
    return {
        "town": {
            "zip": zip,
            "city": "Sample City",
            "state": "CA",
            "lat": 37.7749,
            "lon": -122.4194,
            "last_refreshed": None,
        },
        "hotels": [],
        "restaurants": [],
        "activities": [],
        "legend": None,
    }

