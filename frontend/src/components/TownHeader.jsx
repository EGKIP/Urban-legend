export default function TownHeader({ town, loading }) {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 w-64 bg-slate-800 rounded mb-2" />
        <div className="h-5 w-40 bg-slate-800 rounded" />
      </div>
    )
  }

  if (!town) return null

  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {town.city}, <span className="text-orange-500">{town.state}</span>
          </h1>
          <p className="text-slate-400">
            ZIP {town.zip_code} • {town.state_name}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          {town.lat?.toFixed(4)}, {town.lon?.toFixed(4)}
        </span>
      </div>
    </div>
  )
}

