"""Seed database with mock data. Run: python -m app.seed"""

from app.db import SessionLocal, engine, Base
from app.models import Town, Place, Legend

MOCK_TOWNS = [
    {
        "zip_code": "10001",
        "city": "New York",
        "state": "NY",
        "state_name": "New York",
        "county": "New York County",
        "lat": 40.7484,
        "lon": -73.9967,
        "timezone": "America/New_York",
    },
    {
        "zip_code": "90210",
        "city": "Beverly Hills",
        "state": "CA",
        "state_name": "California",
        "county": "Los Angeles County",
        "lat": 34.0901,
        "lon": -118.4065,
        "timezone": "America/Los_Angeles",
    },
    {
        "zip_code": "02101",
        "city": "Boston",
        "state": "MA",
        "state_name": "Massachusetts",
        "county": "Suffolk County",
        "lat": 42.3601,
        "lon": -71.0589,
        "timezone": "America/New_York",
    },
    {
        "zip_code": "60601",
        "city": "Chicago",
        "state": "IL",
        "state_name": "Illinois",
        "county": "Cook County",
        "lat": 41.8819,
        "lon": -87.6278,
        "timezone": "America/Chicago",
    },
]

MOCK_PLACES = {
    "10001": [
        {"place_type": "hotel", "name": "The Standard High Line", "rating": 4.5, "price_level": 3},
        {"place_type": "restaurant", "name": "Katz's Delicatessen", "rating": 4.6, "cuisine_type": "Deli"},
        {"place_type": "activity", "name": "High Line Park", "rating": 4.8},
    ],
    "90210": [
        {"place_type": "hotel", "name": "The Beverly Hills Hotel", "rating": 4.7, "price_level": 4},
        {"place_type": "restaurant", "name": "Spago", "rating": 4.5, "cuisine_type": "American"},
        {"place_type": "activity", "name": "Rodeo Drive", "rating": 4.6},
    ],
}

MOCK_LEGENDS = {
    "10001": {
        "title": "The Phantom of Penn Station",
        "content": "Deep beneath the bustling streets of Midtown, old-timers speak of a figure seen wandering the forgotten tunnels of the original Penn Station. They say it's the ghost of a conductor who refused to leave when the grand station was demolished in 1963.",
        "theme": "mystery",
    },
    "90210": {
        "title": "The Starlet's Mirror",
        "content": "In a mansion on Sunset Boulevard, there hangs a mirror that once belonged to a forgotten starlet of the silent film era. Visitors claim that on moonless nights, you can see her reflection practicing lines for a role she never got to play.",
        "theme": "folklore",
    },
}


def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        existing = db.query(Town).first()
        if existing:
            print("Database already seeded. Skipping.")
            return

        for town_data in MOCK_TOWNS:
            town = Town(**town_data)
            db.add(town)
            db.flush()

            zip_code = town_data["zip_code"]

            # Add places
            if zip_code in MOCK_PLACES:
                for place_data in MOCK_PLACES[zip_code]:
                    place = Place(town_id=town.id, **place_data)
                    db.add(place)

            # Add legend
            if zip_code in MOCK_LEGENDS:
                legend = Legend(town_id=town.id, **MOCK_LEGENDS[zip_code])
                db.add(legend)

        db.commit()
        print(f"Seeded {len(MOCK_TOWNS)} towns with places and legends.")

    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

