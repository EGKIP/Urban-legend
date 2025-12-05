from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Town(Base):
    __tablename__ = "towns"

    id = Column(Integer, primary_key=True, index=True)
    zip_code = Column(String(5), unique=True, index=True, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(2), nullable=False)
    state_name = Column(String(50))
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    places = relationship("Place", back_populates="town", cascade="all, delete-orphan")
    legend = relationship("Legend", back_populates="town", uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "zip": self.zip_code,
            "city": self.city,
            "state": self.state,
            "state_name": self.state_name,
            "lat": self.lat,
            "lon": self.lon,
        }

