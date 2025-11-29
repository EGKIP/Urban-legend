import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownHeader from '../components/TownHeader'
import DashboardCard from '../components/DashboardCard'
import { BuildingIcon, ForkKnifeIcon, CompassIcon, BookOpenIcon, XIcon, WarningIcon, TrendingUpIcon } from '../components/Icons'

const API_URL = 'http://localhost:8000'

export default function Town() {
  const { zip } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showLegend, setShowLegend] = useState(false)

  useEffect(() => {
    const fetchTown = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_URL}/api/town?zip=${zip}`)
        if (!res.ok) throw new Error('Town not found')
        const json = await res.json()
        setData(json)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTown()
  }, [zip])

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 flex items-center justify-center">
          <WarningIcon className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">ZIP Code Not Found</h1>
        <p className="text-slate-400 mb-6">We couldn't find data for ZIP code {zip}</p>
        <Link to="/" className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors">
          Try another ZIP code
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <TownHeader town={data?.town} loading={loading} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TrendingUpIcon className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-slate-100">
              What's Trending
              <span className="text-slate-400 font-normal ml-2">in {data?.town?.city || '...'}</span>
            </h2>
          </div>
          {data?.legend && (
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-gold-400 hover:text-gold-300 border border-gold-500/30 hover:border-gold-500/50 rounded-lg transition-all hover:bg-gold-500/5"
            >
              <BookOpenIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Urban Legend</span>
            </button>
          )}
        </div>

        {/* Legend Panel */}
        {showLegend && data?.legend && (
          <div className="mb-6 px-6 py-4 bg-slate-900/80 rounded-xl border border-gold-500/20">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gold-400 mb-2">{data.legend.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{data.legend.story}</p>
              </div>
              <button
                onClick={() => setShowLegend(false)}
                className="text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <DashboardCard
            title="Top Hotels"
            icon={BuildingIcon}
            items={data?.hotels}
            loading={loading}
            emptyText="Hotel data coming soon..."
          />
          <DashboardCard
            title="Popular Eats"
            icon={ForkKnifeIcon}
            items={data?.restaurants}
            loading={loading}
            emptyText="Restaurant data coming soon..."
          />
          <DashboardCard
            title="Things to Do"
            icon={CompassIcon}
            items={data?.activities}
            loading={loading}
            emptyText="Activity data coming soon..."
          />
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Hotels" value={data?.hotels?.length || 0} loading={loading} />
          <StatCard label="Restaurants" value={data?.restaurants?.length || 0} loading={loading} />
          <StatCard label="Activities" value={data?.activities?.length || 0} loading={loading} />
          <StatCard label="Stories" value={data?.legend ? 1 : 0} loading={loading} />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, loading }) {
  if (loading) {
    return <div className="h-16 bg-slate-800/50 rounded-xl animate-pulse" />
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4 shadow-md shadow-black/20">
      <p className="text-2xl font-bold text-orange-400">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  )
}

