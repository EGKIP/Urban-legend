"""Yelp Fusion API client for fetching POI data."""

import os
from typing import Optional
import httpx

YELP_API_KEY = os.getenv("YELP_API_KEY", "")
YELP_BASE_URL = "https://api.yelp.com/v3"


class YelpService:
    def __init__(self):
        self.api_key = YELP_API_KEY
        self.headers = {"Authorization": f"Bearer {self.api_key}"}

    def _is_configured(self) -> bool:
        return bool(self.api_key)

    async def _search(
        self,
        lat: float,
        lon: float,
        categories: str,
        limit: int = 5,
    ) -> list[dict]:
        if not self._is_configured():
            return []

        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(
                    f"{YELP_BASE_URL}/businesses/search",
                    headers=self.headers,
                    params={
                        "latitude": lat,
                        "longitude": lon,
                        "categories": categories,
                        "limit": limit,
                        "sort_by": "rating",
                    },
                    timeout=10.0,
                )
                if resp.status_code != 200:
                    return []

                data = resp.json()
                return [self._format_business(b) for b in data.get("businesses", [])]
        except Exception:
            return []

    def _format_business(self, biz: dict) -> dict:
        location = biz.get("location", {})
        return {
            "id": biz.get("id"),
            "name": biz.get("name"),
            "rating": biz.get("rating"),
            "review_count": biz.get("review_count"),
            "price": biz.get("price", ""),
            "image_url": biz.get("image_url"),
            "url": biz.get("url"),
            "phone": biz.get("display_phone"),
            "address": ", ".join(location.get("display_address", [])),
            "categories": [c.get("title") for c in biz.get("categories", [])],
        }

    async def get_hotels(self, lat: float, lon: float, limit: int = 15) -> list[dict]:
        return await self._search(lat, lon, "hotels,hostels,bedbreakfast", limit)

    async def get_restaurants(self, lat: float, lon: float, limit: int = 15) -> list[dict]:
        return await self._search(lat, lon, "restaurants,food", limit)

    async def get_activities(self, lat: float, lon: float, limit: int = 15) -> list[dict]:
        return await self._search(lat, lon, "arts,tours,active", limit)

    async def get_all_places(
        self, lat: float, lon: float, limit: int = 15
    ) -> dict[str, list[dict]]:
        hotels = await self.get_hotels(lat, lon, limit)
        restaurants = await self.get_restaurants(lat, lon, limit)
        activities = await self.get_activities(lat, lon, limit)

        return {
            "hotels": hotels,
            "restaurants": restaurants,
            "activities": activities,
        }


yelp_service = YelpService()

