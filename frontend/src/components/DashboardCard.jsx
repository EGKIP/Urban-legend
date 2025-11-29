export default function DashboardCard({ title, icon, items, loading, emptyText }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/50 hover:border-slate-700/50 transition-all hover:shadow-xl hover:shadow-slate-900/50 group">
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
        {title}
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-800 rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : items?.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-4 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/60 transition-all cursor-pointer group/item"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center flex-shrink-0 border border-orange-500/20 group-hover/item:border-orange-500/40 transition-colors">
                <span className="text-orange-500 font-bold">{idx + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium truncate group-hover/item:text-orange-400 transition-colors">{item.name}</p>
                <p className="text-slate-500 text-sm truncate">{item.address || item.description}</p>
              </div>
              <svg className="w-5 h-5 text-slate-600 group-hover/item:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
            <span className="text-3xl opacity-50">{icon}</span>
          </div>
          <p className="text-slate-500">{emptyText || 'No data available'}</p>
        </div>
      )}
    </div>
  )
}

