"""
News service - fetches local news from Google News RSS feeds.
"""
import feedparser
from urllib.parse import quote
from typing import List, Optional
import re


class NewsService:
    """Fetches local news headlines from Google News RSS."""

    BASE_URL = "https://news.google.com/rss/search"

    def _parse_date(self, date_str: str) -> Optional[str]:
        """Parse RSS date to ISO format."""
        try:
            from email.utils import parsedate_to_datetime
            dt = parsedate_to_datetime(date_str)
            return dt.isoformat()
        except Exception:
            return None

    def _extract_image(self, entry: dict) -> Optional[str]:
        """Try to extract image URL from entry."""
        # Check media content
        if hasattr(entry, 'media_content') and entry.media_content:
            for media in entry.media_content:
                if media.get('url'):
                    return media['url']
        # Check enclosures
        if hasattr(entry, 'enclosures') and entry.enclosures:
            for enc in entry.enclosures:
                if enc.get('type', '').startswith('image'):
                    return enc.get('url')
        return None

    def _clean_summary(self, summary: str) -> str:
        """Remove HTML tags from summary."""
        clean = re.sub(r'<[^>]+>', '', summary or '')
        return clean.strip()[:200] if clean else ''

    def _is_video(self, entry: dict) -> bool:
        """Check if the article is a video."""
        link = entry.get('link', '').lower()
        title = entry.get('title', '').lower()
        return 'video' in link or 'watch' in title or 'youtube' in link

    async def get_news(self, city: str, limit: int = 5) -> List[dict]:
        """
        Fetch local news for a city from Google News RSS.
        
        Args:
            city: City name (e.g., "Chicago", "Los Angeles")
            limit: Max number of articles to return
            
        Returns:
            List of news articles with title, link, publishedAt, summary, imageUrl
        """
        try:
            encoded_city = quote(city)
            url = f"{self.BASE_URL}?q={encoded_city}+local+news&hl=en-US&gl=US&ceid=US:en"
            
            feed = feedparser.parse(url)
            
            if not feed.entries:
                return []
            
            articles = []
            for entry in feed.entries[:limit]:
                article = {
                    "title": entry.get('title', 'No title'),
                    "link": entry.get('link', ''),
                    "publishedAt": self._parse_date(entry.get('published', '')),
                    "summary": self._clean_summary(entry.get('summary', '')),
                    "imageUrl": self._extract_image(entry),
                    "source": entry.get('source', {}).get('title', 'Google News'),
                    "isVideo": self._is_video(entry),
                }
                articles.append(article)
            
            return articles
            
        except Exception as e:
            print(f"News fetch error for {city}: {e}")
            return []


news_service = NewsService()

