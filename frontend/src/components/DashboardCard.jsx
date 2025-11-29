import { ChevronRightIcon, StarIcon } from './Icons'

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
              <div className="w-12 h-12 bg-slate-800 rounded-lg" />
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
            <PlaceItem key={item.id || idx} item={item} />
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

function PlaceItem({ item }) {
  return (
    <li className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer group/item">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
          <span className="text-slate-600 text-xs">No img</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-slate-100 font-medium text-sm truncate group-hover/item:text-orange-400 transition-colors">
          {item.name}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {item.rating && (
            <span className="flex items-center gap-0.5 text-gold-400">
              <StarIcon className="w-3 h-3" />
              {item.rating}
            </span>
          )}
          {item.price && <span className="text-green-500">{item.price}</span>}
          {item.address && <span className="truncate">{item.address}</span>}
        </div>
      </div>
      <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover/item:text-orange-500 transition-colors flex-shrink-0" />
    </li>
  )
}

