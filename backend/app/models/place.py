from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text
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
    price_level = Column(Integer)
    image_url = Column(String(500))
    phone = Column(String(20))
    website = Column(String(300))
    cuisine_type = Column(String(100))
    amenities = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    town = relationship("Town", back_populates="places")

    def __repr__(self):
        return f"<Place {self.name} ({self.place_type})>"

