import { ChevronRightIcon, StarIcon } from './Icons'

export default function DashboardCard({ title, icon: Icon, items, loading, emptyText }) {
  return (
    <div className="bg-slate-900/70 rounded-xl border border-slate-800/50 shadow-lg shadow-black/10 flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-800/40">
        <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2.5">
          <span className="text-orange-400">
            {Icon && <Icon className="w-4.5 h-4.5" />}
          </span>
          {title}
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto max-h-[380px]">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse flex items-center gap-3">
                <div className="w-14 h-14 bg-slate-800/70 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-slate-800/70 rounded w-4/5 mb-2" />
                  <div className="h-3 bg-slate-800/50 rounded w-3/5" />
                </div>
              </div>
            ))}
          </div>
        ) : items?.length > 0 ? (
          <ul className="space-y-2.5">
            {items.map((item, idx) => (
              <PlaceItem key={item.id || idx} item={item} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 mb-3 rounded-xl bg-slate-800/60 flex items-center justify-center text-slate-600">
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <p className="text-slate-500 text-sm">{emptyText || 'No data available'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function PlaceItem({ item }) {
  const categories = item.categories?.slice(0, 2).join(', ') || ''

  return (
    <li className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 border border-transparent hover:border-slate-700/40 transition-all cursor-pointer group/item">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700/30">
          <span className="text-slate-600 text-[10px] uppercase tracking-wide">No image</span>
        </div>
      )}
      <div className="min-w-0 flex-1 py-0.5">
        <p className="text-slate-100 font-medium text-sm leading-tight truncate group-hover/item:text-orange-400 transition-colors">
          {item.name}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs">
          {item.rating && (
            <span className="inline-flex items-center gap-0.5 text-gold-400 font-medium">
              <StarIcon className="w-3 h-3" />
              {item.rating}
            </span>
          )}
          {item.review_count && (
            <span className="text-slate-500">({item.review_count})</span>
          )}
          {item.price && (
            <span className="text-emerald-500 font-medium">{item.price}</span>
          )}
        </div>
        {(categories || item.address) && (
          <p className="text-slate-500 text-xs mt-1 truncate">
            {categories && <span className="text-slate-400">{categories}</span>}
            {categories && item.address && <span className="mx-1.5 text-slate-600">·</span>}
            {item.address && <span>{item.address}</span>}
          </p>
        )}
      </div>
      <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover/item:text-orange-400 transition-colors flex-shrink-0 mt-1" />
    </li>
  )
}

