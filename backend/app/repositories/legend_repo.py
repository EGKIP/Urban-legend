from typing import Optional
from sqlalchemy.orm import Session

from app.models import Legend, Town


class LegendRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_town(self, town_id: int) -> Optional[Legend]:
        return self.db.query(Legend).filter(Legend.town_id == town_id).first()

    def create(self, town_id: int, story: str) -> Legend:
        legend = Legend(town_id=town_id, story=story)
        self.db.add(legend)
        self.db.commit()
        self.db.refresh(legend)
        return legend

    def update(self, legend: Legend, story: str) -> Legend:
        legend.story = story
        self.db.commit()
        self.db.refresh(legend)
        return legend

    def get_or_generate(self, town: Town, generator) -> str:
        existing = self.get_by_town(town.id)
        if existing:
            return existing.story
        return None

