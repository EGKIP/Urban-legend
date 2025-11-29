import { MapPinIcon } from './Icons'

export default function TownHeader({ town, loading }) {
  if (loading) {
    return (
      <div className="w-full bg-gradient-to-b from-slate-800/30 to-transparent py-8">
        <div className="max-w-6xl mx-auto px-4 animate-pulse">
          <div className="h-10 w-64 bg-slate-800 rounded-lg mb-2" />
          <div className="h-5 w-40 bg-slate-800 rounded" />
        </div>
      </div>
    )
  }

  if (!town) return null

  return (
    <div className="w-full bg-gradient-to-b from-slate-800/20 to-transparent py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <MapPinIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">
                {town.city}<span className="text-slate-500">,</span> <span className="text-orange-500">{town.state}</span>
              </h1>
              <p className="text-slate-400 text-sm">{town.state_name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="px-3 py-2 bg-slate-900/60 rounded-lg border border-slate-800/60 shadow-md shadow-black/20">
              <p className="text-slate-500 text-xs uppercase tracking-wide">ZIP</p>
              <p className="text-slate-100 font-semibold">{town.zip_code}</p>
            </div>
            <div className="px-3 py-2 bg-slate-900/60 rounded-lg border border-slate-800/60 shadow-md shadow-black/20">
              <p className="text-slate-500 text-xs uppercase tracking-wide">Coords</p>
              <p className="text-slate-100 font-mono text-xs">{town.lat?.toFixed(4)}, {town.lon?.toFixed(4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

