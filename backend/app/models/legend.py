from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db import Base


class Legend(Base):
    __tablename__ = "legends"

    id = Column(Integer, primary_key=True, index=True)
    town_id = Column(Integer, ForeignKey("towns.id"), unique=True, nullable=False, index=True)
    story = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    town = relationship("Town", back_populates="legend")

    def to_dict(self):
        return {
            "story": self.story,
        }

