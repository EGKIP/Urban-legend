from pydantic_settings import BaseSettings
from functools import lru_cache
import os

DB_USER = os.getenv("USER", "postgres")


class Settings(BaseSettings):
    app_env: str = "development"
    debug: bool = True
    database_url: str = f"postgresql://{DB_USER}@localhost:5432/urban_legend"
    redis_url: str = "redis://localhost:6379/0"
    yelp_api_key: str = ""
    yelp_api_base_url: str = "https://api.yelp.com/v3"
    groq_api_key: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()

