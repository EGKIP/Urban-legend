from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Legend(Base):
    __tablename__ = "legends"

    id = Column(Integer, primary_key=True, index=True)
    town_id = Column(Integer, ForeignKey("towns.id"), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    theme = Column(String(50))
    generated_by = Column(String(50), default="openai")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    town = relationship("Town", back_populates="legend")

    def __repr__(self):
        return f"<Legend '{self.title}' for town_id={self.town_id}>"

