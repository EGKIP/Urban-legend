from typing import Optional
import httpx
from datetime import datetime, timedelta

class GeocodeService:
    """Geocode city/state queries using Nominatim (OpenStreetMap)."""
    
    BASE_URL = "https://nominatim.openstreetmap.org/search"
    REVERSE_URL = "https://nominatim.openstreetmap.org/reverse"
    
    # In-memory cache (24h TTL)
    _cache: dict = {}
    _cache_ttl = timedelta(hours=24)
    
    async def geocode(self, query: str) -> Optional[dict]:
        """Convert city/state query to coordinates and ZIP code."""
        query = query.strip()
        if not query:
            return None
        
        # Check cache
        cache_key = query.lower()
        if cache_key in self._cache:
            entry = self._cache[cache_key]
            if datetime.now() < entry["expires"]:
                return entry["data"]
        
        try:
            async with httpx.AsyncClient() as client:
                # Search for location (US only)
                resp = await client.get(
                    self.BASE_URL,
                    params={
                        "q": f"{query}, USA",
                        "format": "json",
                        "limit": 1,
                        "countrycodes": "us",
                        "addressdetails": 1,
                    },
                    headers={"User-Agent": "UrbanLegend/1.0"},
                    timeout=10.0,
                )
                
                if resp.status_code != 200 or not resp.json():
                    return None
                
                results = resp.json()
                if not results:
                    return None
                
                result = results[0]
                lat = float(result.get("lat", 0))
                lon = float(result.get("lon", 0))
                address = result.get("address", {})

                city = (address.get("city") or address.get("town") or
                        address.get("village") or address.get("municipality") or
                        result.get("name"))
                state = address.get("state")
                postcode = address.get("postcode", "")

                # If no postcode or invalid, try reverse geocoding
                if not postcode or not postcode[:5].isdigit():
                    postcode = await self._get_zip_from_coords(client, lat, lon)

                # Take first 5 digits of ZIP
                zip_code = postcode[:5] if postcode and len(postcode) >= 5 else None

                # City is required, ZIP is nice to have
                if not city:
                    return None
                
                data = {
                    "city": city,
                    "state": self._get_state_abbr(state) if state else None,
                    "state_name": state,
                    "lat": lat,
                    "lon": lon,
                    "zip": zip_code,
                }
                
                # Cache result
                self._cache[cache_key] = {
                    "data": data,
                    "expires": datetime.now() + self._cache_ttl,
                }
                
                return data
                
        except Exception:
            return None
    
    async def _get_zip_from_coords(self, client: httpx.AsyncClient, lat: float, lon: float) -> Optional[str]:
        """Reverse geocode to get ZIP code from coordinates."""
        try:
            resp = await client.get(
                self.REVERSE_URL,
                params={
                    "lat": lat,
                    "lon": lon,
                    "format": "json",
                    "addressdetails": 1,
                },
                headers={"User-Agent": "UrbanLegend/1.0"},
                timeout=10.0,
            )
            if resp.status_code == 200:
                data = resp.json()
                return data.get("address", {}).get("postcode")
        except Exception:
            pass
        return None
    
    def _get_state_abbr(self, state_name: str) -> str:
        """Convert state name to abbreviation."""
        states = {
            "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
            "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
            "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
            "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
            "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
            "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
            "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
            "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
            "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
            "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
            "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
            "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
            "Wisconsin": "WI", "Wyoming": "WY", "District of Columbia": "DC",
        }
        return states.get(state_name, state_name[:2].upper() if state_name else "")


geocode_service = GeocodeService()

