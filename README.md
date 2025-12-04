# Urban Legend

A location-based travel discovery and AI storytelling web app. Enter any US ZIP code to explore local hotels, restaurants, activities, news, and unique AI-generated urban legends.

## Features

- **ZIP Code Search** - Enter any US ZIP to discover a town
- **Hotels** - Top-rated hotels and accommodations via Yelp
- **Restaurants** - Popular dining spots with ratings and reviews
- **Activities** - Things to do, tours, and local attractions
- **Local News** - Real-time headlines from Google News RSS
- **Urban Legends** - AI-generated stories unique to each location (coming soon)

## Tech Stack

**Backend**
- Python 3.11+ / FastAPI
- PostgreSQL + SQLAlchemy
- Redis (caching)
- External APIs: Yelp Fusion, zippopotam.us, Google News RSS

**Frontend**
- React 18 + Vite
- Tailwind CSS
- react-router-dom

## Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (optional, for caching)
- Yelp API key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env file
echo "YELP_API_KEY=your_key_here" > .env

# Run server
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/town?zip=XXXXX` | Get town info, hotels, restaurants, activities |
| `GET /api/trending-news?city=Chicago` | Get local news headlines |
| `GET /health` | Health check |

## Project Structure

```
urban-legend/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── services/
│   │   │   ├── yelp_service.py
│   │   │   ├── news_service.py
│   │   │   └── zip_lookup.py
│   │   └── models/
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── index.css
│   └── package.json
└── README.md
```

## Roadmap

- [x] ZIP code lookup
- [x] Yelp API integration (hotels, restaurants, activities)
- [x] Local news feed
- [ ] PostgreSQL caching
- [ ] AI legend generation
- [ ] Weather widget
- [ ] Interactive map view

## License

MIT
