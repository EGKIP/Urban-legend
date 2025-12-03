import feedparser
from urllib.parse import quote
from typing import List, Optional
import re


class NewsService:
    BASE_URL = "https://news.google.com/rss/search"

    def _parse_date(self, date_str: str) -> Optional[str]:
        try:
            from email.utils import parsedate_to_datetime
            dt = parsedate_to_datetime(date_str)
            return dt.isoformat()
        except Exception:
            return None

    def _extract_image(self, entry: dict) -> Optional[str]:
        if hasattr(entry, 'media_content') and entry.media_content:
            for media in entry.media_content:
                if media.get('url'):
                    return media['url']
        if hasattr(entry, 'enclosures') and entry.enclosures:
            for enc in entry.enclosures:
                if enc.get('type', '').startswith('image'):
                    return enc.get('url')
        return None

    def _clean_summary(self, summary: str) -> str:
        clean = re.sub(r'<[^>]+>', '', summary or '')
        return clean.strip()[:200] if clean else ''

    def _is_video(self, entry: dict) -> bool:
        link = entry.get('link', '').lower()
        title = entry.get('title', '').lower()
        return 'video' in link or 'watch' in title or 'youtube' in link

    async def get_news(self, city: str, limit: int = 12) -> List[dict]:
        try:
            encoded_city = quote(city)
            url = f"{self.BASE_URL}?q={encoded_city}+local+news&hl=en-US&gl=US&ceid=US:en"

            feed = feedparser.parse(url)
            if not feed.entries:
                return []

            articles = []
            for entry in feed.entries[:limit]:
                articles.append({
                    "title": entry.get('title', 'No title'),
                    "link": entry.get('link', ''),
                    "publishedAt": self._parse_date(entry.get('published', '')),
                    "summary": self._clean_summary(entry.get('summary', '')),
                    "imageUrl": self._extract_image(entry),
                    "source": entry.get('source', {}).get('title', 'Google News'),
                    "isVideo": self._is_video(entry),
                })

            return articles
        except Exception as e:
            print(f"News fetch error: {e}")
            return []


news_service = NewsService()

