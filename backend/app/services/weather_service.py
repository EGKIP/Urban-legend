import httpx
from datetime import datetime, timedelta
from typing import Optional
from app.config import get_settings

settings = get_settings()

weather_cache = {}
CACHE_TTL = timedelta(minutes=20)


class WeatherService:
    BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

    async def get_weather(self, lat: float, lon: float) -> Optional[dict]:
        cache_key = f"{lat:.2f},{lon:.2f}"
        
        if cache_key in weather_cache:
            cached, timestamp = weather_cache[cache_key]
            if datetime.now() - timestamp < CACHE_TTL:
                return cached

        try:
            async with httpx.AsyncClient() as client:
                res = await client.get(
                    self.BASE_URL,
                    params={
                        "lat": lat,
                        "lon": lon,
                        "appid": settings.openweather_api_key,
                        "units": "imperial"
                    },
                    timeout=10.0
                )
                if res.status_code != 200:
                    return None

                data = res.json()
                weather = {
                    "temp": round(data["main"]["temp"]),
                    "feels_like": round(data["main"]["feels_like"]),
                    "description": data["weather"][0]["description"],
                    "icon": data["weather"][0]["icon"],
                    "humidity": data["main"]["humidity"],
                    "wind_speed": round(data["wind"]["speed"]),
                }
                weather_cache[cache_key] = (weather, datetime.now())
                return weather
        except Exception:
            return None

