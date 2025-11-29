import { ChevronRightIcon } from './Icons'

export default function DashboardCard({ title, icon: Icon, items, loading, emptyText }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl p-5 border border-slate-800/60 shadow-md shadow-black/20 hover:border-slate-700/60 transition-all group">
      <h2 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-3 border-b border-slate-800/50 pb-3">
        <span className="text-orange-500 group-hover:scale-110 transition-transform">
          {Icon && <Icon className="w-5 h-5" />}
        </span>
        {title}
      </h2>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : items?.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer group/item"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0 border border-orange-500/20 group-hover/item:border-orange-500/40 transition-colors">
                <span className="text-orange-400 font-semibold text-sm">{idx + 1}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-slate-100 font-medium truncate group-hover/item:text-orange-400 transition-colors">{item.name}</p>
                <p className="text-slate-500 text-sm truncate">{item.address || item.description}</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover/item:text-orange-500 transition-colors" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-600">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <p className="text-slate-500 text-sm">{emptyText || 'No data available'}</p>
        </div>
      )}
    </div>
  )
}

