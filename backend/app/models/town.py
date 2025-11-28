from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Town(Base):
    """Represents a town/city identified by ZIP code."""

    __tablename__ = "towns"

    id = Column(Integer, primary_key=True, index=True)
    zip_code = Column(String(5), unique=True, index=True, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(2), nullable=False)
    state_name = Column(String(50))
    county = Column(String(100))
    lat = Column(Float, nullable=False)
    lon = Column(Float, nullable=False)
    timezone = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    places = relationship("Place", back_populates="town", cascade="all, delete-orphan")
    legend = relationship("Legend", back_populates="town", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Town {self.city}, {self.state} ({self.zip_code})>"

