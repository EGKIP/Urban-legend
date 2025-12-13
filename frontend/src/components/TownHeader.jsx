import { MapPinIcon } from './Icons'
import WeatherCard from './WeatherCard'

export default function TownHeader({ town, loading }) {
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
      <div className="max-w-6xl mx-auto px-6 py-5">
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
            <div className="hidden sm:block px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/40">
              <p className="text-slate-500 text-[10px] uppercase tracking-wider font-medium">Coordinates</p>
              <p className="text-slate-300 font-mono text-xs">{town.lat?.toFixed(4)}, {town.lon?.toFixed(4)}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

