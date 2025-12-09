from typing import Optional
from sqlalchemy.orm import Session

from app.models import Legend


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

    def delete_by_town(self, town_id: int) -> None:
        self.db.query(Legend).filter(Legend.town_id == town_id).delete()
        self.db.commit()

