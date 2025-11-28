import { useParams } from 'react-router-dom'

export default function Town() {
  const { zip } = useParams()

  return (
    <div className="px-6 py-8">
      {/* Town Header placeholder */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Loading...</h1>
        <p className="text-slate-400">ZIP: {zip}</p>
      </div>

      {/* Dashboard grid placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hotels section */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-500">Hotels</span>
          </h2>
          <p className="text-slate-500">Loading hotels...</p>
        </div>

        {/* Restaurants section */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-500">Restaurants</span>
          </h2>
          <p className="text-slate-500">Loading restaurants...</p>
        </div>

        {/* Activities section */}
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-orange-500">Activities</span>
          </h2>
          <p className="text-slate-500">Loading activities...</p>
        </div>
      </div>

      {/* Legend section placeholder */}
      <div className="mt-8 bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-gold-400 mb-4">Urban Legend</h2>
        <p className="text-slate-500">The legend will appear here...</p>
      </div>
    </div>
  )
}

