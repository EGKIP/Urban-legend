import { useState, useEffect } from 'react'
import { MapPinIcon, ClockIcon } from './Icons'
import WeatherCard from './WeatherCard'

function useLocalTime(lat, lon) {
  const [time, setTime] = useState(null)

  useEffect(() => {
    if (!lat || !lon) return

    const updateTime = () => {
      try {
        const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone
        const formatter = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: tzName
        })
        setTime(formatter.format(new Date()))
      } catch {
        const now = new Date()
        setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }))
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [lat, lon])

  return time
}

export default function TownHeader({ town, loading }) {
  const localTime = useLocalTime(town?.lat, town?.lon)

  if (loading) {
    return (
      <header className="w-full border-b border-slate-800/40 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6 py-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-slate-800 rounded-xl" />
              <div>
                <div className="h-7 w-48 bg-slate-800 rounded-lg mb-2" />
                <div className="h-4 w-32 bg-slate-800/60 rounded" />
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-20 h-14 bg-slate-800/60 rounded-lg" />
              <div className="w-28 h-14 bg-slate-800/60 rounded-lg" />
            </div>
          </div>
        </div>
      </header>
    )
  }

  if (!town) return null

  return (
    <header className="w-full border-b border-slate-800/40 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/15">
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight leading-tight">
                {town.city}<span className="text-slate-600">,</span>{' '}
                <span className="text-orange-400">{town.state}</span>
              </h1>
              <p className="text-slate-500 text-sm">{town.state_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <WeatherCard lat={town.lat} lon={town.lon} />
            <div className="px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">ZIP</p>
              <p className="text-slate-200 font-semibold text-sm">{town.zip_code}</p>
            </div>
            {localTime && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40">
                <ClockIcon className="w-4 h-4 text-slate-500" />
                <div>
                  <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Local</p>
                  <p className="text-slate-200 font-semibold text-sm">{localTime}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

