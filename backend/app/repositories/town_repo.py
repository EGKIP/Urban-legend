from datetime import datetime, timedelta
from typing import Optional
from sqlalchemy.orm import Session

from app.models import Town, Place


class TownRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_zip(self, zip_code: str) -> Optional[Town]:
        return self.db.query(Town).filter(Town.zip_code == zip_code).first()

    def create(self, data: dict) -> Town:
        town = Town(
            zip_code=data["zip_code"],
            city=data["city"],
            state=data["state"],
            state_name=data.get("state_name"),
            lat=data["lat"],
            lon=data["lon"],
        )
        self.db.add(town)
        self.db.commit()
        self.db.refresh(town)
        return town

    def get_or_create(self, data: dict) -> Town:
        town = self.get_by_zip(data["zip_code"])
        if town:
            return town
        return self.create(data)

    def has_fresh_places(self, town: Town, hours: int = 24) -> bool:
        if not town.places:
            return False
        oldest = min(p.created_at for p in town.places)
        return datetime.utcnow() - oldest.replace(tzinfo=None) < timedelta(hours=hours)

    def save_places(self, town: Town, places: dict) -> None:
        self.db.query(Place).filter(Place.town_id == town.id).delete()
        
        for place_type, items in places.items():
            for item in items:
                place = Place(
                    town_id=town.id,
                    external_id=item.get("id"),
                    place_type=place_type,
                    name=item["name"],
                    address=item.get("address"),
                    rating=item.get("rating"),
                    review_count=item.get("review_count", 0),
                    price=item.get("price"),
                    image_url=item.get("image_url"),
                    url=item.get("url"),
                    phone=item.get("phone"),
                    categories=item.get("categories"),
                )
                self.db.add(place)
        
        self.db.commit()

    def get_places(self, town: Town) -> dict:
        places = self.db.query(Place).filter(Place.town_id == town.id).all()
        result = {"hotels": [], "restaurants": [], "activities": []}
        for p in places:
            if p.place_type in result:
                result[p.place_type].append(p.to_dict())
        return result

