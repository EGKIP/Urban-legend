from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Legend(Base):
    """Stores AI-generated urban legend for a town."""

    __tablename__ = "legends"

    id = Column(Integer, primary_key=True, index=True)
    town_id = Column(Integer, ForeignKey("towns.id"), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    theme = Column(String(50))  # e.g., mystery, folklore, historical
    generated_by = Column(String(50), default="openai")  # LLM provider used
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    town = relationship("Town", back_populates="legend")

    def __repr__(self):
        return f"<Legend '{self.title}' for town_id={self.town_id}>"

