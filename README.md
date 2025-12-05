# Urban Legend

A location-based travel discovery and AI storytelling web app. Enter any US ZIP code to explore local hotels, restaurants, activities, news, and unique AI-generated urban legends.

## Features

- **ZIP Code Search** - Enter any US ZIP to discover a town
- **Hotels** - Top-rated hotels and accommodations via Yelp
- **Restaurants** - Popular dining spots with ratings and reviews
- **Activities** - Things to do, tours, and local attractions
- **Local News** - Real-time headlines from Google News RSS
- **Urban Legends** - AI-generated stories unique to each location 

## Tech Stack

**Backend**
- Python / FastAPI
- PostgreSQL + SQLAlchemy
- Redis (caching)
- APIs: Yelp Fusion, zippopotam.us, Google News RSS

**Frontend**
- React 18 + Vite
- Tailwind CSS
- react-router-dom

## Roadmap

- [x] ZIP code lookup
- [x] Yelp API integration (hotels, restaurants, activities)
- [x] Local news feed
- [x] PostgreSQL caching (towns, places, legends)
- [x] AI legend generation (Groq + Llama 3.1)
- [ ] Regenerate legend button
- [ ] Weather widget
- [ ] Interactive map view

## License

MIT
