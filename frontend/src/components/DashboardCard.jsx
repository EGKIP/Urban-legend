export default function DashboardCard({ title, icon, items, loading, emptyText }) {
  return (
    <div className="bg-slate-900/80 backdrop-blur rounded-xl p-6 border border-slate-800 hover:border-slate-700 transition-colors">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-orange-500">{icon}</span>
        {title}
      </h2>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : items?.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                <span className="text-orange-500 text-sm">{idx + 1}</span>
              </div>
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{item.name}</p>
                <p className="text-slate-400 text-sm truncate">{item.address || item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 text-sm">{emptyText || 'No data available'}</p>
      )}
    </div>
  )
}

