export default function LegendCard({ legend, loading }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-900/80 backdrop-blur rounded-xl p-6 border border-gold-500/20 hover:border-gold-500/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-orange-500 flex items-center justify-center shadow-lg shadow-gold-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gold-400">Urban Legend</h2>
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-4 bg-slate-800 rounded w-4/6" />
        </div>
      ) : legend ? (
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{legend.title}</h3>
          <p className="text-slate-300 leading-relaxed">{legend.story}</p>
        </div>
      ) : (
        <p className="text-slate-500 italic">
          Every town has a story waiting to be told. The legend of this place is being written...
        </p>
      )}
    </div>
  )
}

