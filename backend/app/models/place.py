from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Place(Base):
    """Represents a point of interest (hotel, restaurant, activity)."""

    __tablename__ = "places"

    id = Column(Integer, primary_key=True, index=True)
    town_id = Column(Integer, ForeignKey("towns.id"), nullable=False, index=True)
    external_id = Column(String(100), index=True)  # ID from external API
    place_type = Column(String(20), nullable=False, index=True)  # hotel, restaurant, activity
    name = Column(String(200), nullable=False)
    address = Column(String(300))
    lat = Column(Float)
    lon = Column(Float)
    rating = Column(Float)
    price_level = Column(Integer)  # 1-4 scale
    image_url = Column(String(500))
    phone = Column(String(20))
    website = Column(String(300))
    cuisine_type = Column(String(100))  # For restaurants
    amenities = Column(Text)  # JSON string of amenities
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    town = relationship("Town", back_populates="places")

    def __repr__(self):
        return f"<Place {self.name} ({self.place_type})>"

