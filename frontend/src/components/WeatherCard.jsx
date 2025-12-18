import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:8000'

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

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`

  return (
    <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40 flex items-center gap-2">
      <img src={iconUrl} alt={weather.description} className="w-8 h-8" />
      <div>
        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Weather</p>
        <p className="text-slate-200 font-semibold text-sm">{weather.temp}°F</p>
      </div>
    </div>
  )
}

