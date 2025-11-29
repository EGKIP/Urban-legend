from typing import Optional
import httpx

class ZipLookupService:
    BASE_URL = "https://api.zippopotam.us/us"

    async def lookup(self, zip_code: str) -> Optional[dict]:
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(f"{self.BASE_URL}/{zip_code}")
                if resp.status_code != 200:
                    return None
                data = resp.json()
                place = data.get("places", [{}])[0]
                return {
                    "zip_code": data.get("post code"),
                    "city": place.get("place name"),
                    "state": place.get("state abbreviation"),
                    "state_name": place.get("state"),
                    "lat": float(place.get("latitude", 0)),
                    "lon": float(place.get("longitude", 0)),
                }
        except Exception:
            return None


zip_service = ZipLookupService()

