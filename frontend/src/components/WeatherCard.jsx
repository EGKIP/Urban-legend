import { useState, useEffect } from 'react'
import { API_URL } from '../config'

export default function WeatherCard({ lat, lon }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!lat || !lon) return

    const fetchWeather = async () => {
      setError(false)
      try {
        const res = await fetch(`${API_URL}/api/weather?lat=${lat}&lon=${lon}`)
        if (res.ok) {
          const data = await res.json()
          setWeather(data)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [lat, lon])

  if (loading) {
    return (
      <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40 animate-pulse">
        <div className="h-3 w-12 bg-slate-700 rounded mb-1.5" />
        <div className="h-5 w-16 bg-slate-700 rounded" />
      </div>
    )
  }

  if (error || !weather) return null

  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null

  return (
    <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-center gap-1.5">
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={weather.description || 'Weather'}
          className="w-10 h-10 -my-1"
          onError={(e) => e.target.style.display = 'none'}
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center">
          <span className="text-slate-400 text-xs">☀️</span>
        </div>
      )}
      <div className="text-right">
        <p className="text-slate-100 font-semibold text-base leading-tight">{weather.temp}°F</p>
        {weather.description && (
          <p className="text-slate-500 text-[10px] capitalize leading-tight">{weather.description}</p>
        )}
      </div>
    </div>
  )
}

