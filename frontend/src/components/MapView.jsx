import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createIcon = (color) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

const icons = {
  hotel: createIcon('#3b82f6'),
  restaurant: createIcon('#f97316'),
  activity: createIcon('#22c55e')
}

export default function MapView({ hotels = [], restaurants = [], activities = [], center }) {
  if (!center) return null

  const allPlaces = [
    ...hotels.map(p => ({ ...p, type: 'hotel' })),
    ...restaurants.map(p => ({ ...p, type: 'restaurant' })),
    ...activities.map(p => ({ ...p, type: 'activity' }))
  ].filter(p => p.lat && p.lon)

  return (
    <div className="space-y-3">
      <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden border border-slate-800/50">
        <MapContainer
          center={[center.lat, center.lon]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {allPlaces.map((place, i) => (
            <Marker key={i} position={[place.lat, place.lon]} icon={icons[place.type]}>
              <Popup>
                <div className="text-sm min-w-[180px]">
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  {place.rating && (
                    <p className="text-slate-600">⭐ {place.rating} {place.price && `· ${place.price}`}</p>
                  )}
                  {place.address && (
                    <p className="text-slate-500 text-xs mt-1">{place.address}</p>
                  )}
                  {place.url && (
                    <a
                      href={place.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs text-orange-600 hover:text-orange-700 font-medium"
                    >
                      View details →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500"></span> Hotels
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span> Restaurants
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-green-500"></span> Activities
        </span>
      </div>
    </div>
  )
}

