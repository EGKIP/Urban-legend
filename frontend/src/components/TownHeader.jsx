export default function TownHeader({ town, loading }) {
  if (loading) {
    return (
      <div className="w-full bg-gradient-to-b from-slate-800/50 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-12 w-72 bg-slate-800 rounded-lg mb-3" />
          <div className="h-6 w-48 bg-slate-800 rounded" />
        </div>
      </div>
    )
  }

  if (!town) return null

  return (
    <div className="w-full bg-gradient-to-b from-slate-800/30 to-transparent py-10 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-xl shadow-orange-500/25">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {town.city}<span className="text-slate-500">,</span> <span className="text-orange-500">{town.state}</span>
              </h1>
              <p className="text-slate-400 text-lg mt-1">
                {town.state_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
              <p className="text-slate-500 text-xs uppercase tracking-wide">ZIP Code</p>
              <p className="text-white font-semibold text-lg">{town.zip_code}</p>
            </div>
            <div className="px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700">
              <p className="text-slate-500 text-xs uppercase tracking-wide">Coordinates</p>
              <p className="text-white font-mono text-sm">{town.lat?.toFixed(4)}, {town.lon?.toFixed(4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

