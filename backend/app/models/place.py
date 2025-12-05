from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Place(Base):
    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    town_id = Column(Integer, ForeignKey("towns.id"), nullable=False, index=True)
    external_id = Column(String(100), index=True)
    place_type = Column(String(20), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    address = Column(String(300))
    lat = Column(Float)
    lon = Column(Float)
    rating = Column(Float)
    review_count = Column(Integer, default=0)
    price = Column(String(5))
    image_url = Column(String(500))
    url = Column(String(500))
    phone = Column(String(30))
    categories = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    town = relationship("Town", back_populates="places")

    def to_dict(self):
        return {
            "id": self.external_id,
            "name": self.name,
            "rating": self.rating,
            "review_count": self.review_count,
            "price": self.price,
            "image_url": self.image_url,
            "url": self.url,
            "phone": self.phone,
            "address": self.address,
            "categories": self.categories or [],
        }

