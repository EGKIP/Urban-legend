import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownHeader from '../components/TownHeader'
import DashboardCard from '../components/DashboardCard'
import TrendingNews from '../components/TrendingNews'
import { BuildingIcon, ForkKnifeIcon, CompassIcon, BookOpenIcon, XIcon, WarningIcon, TrendingUpIcon, NewspaperIcon } from '../components/Icons'

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
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
          <WarningIcon className="w-7 h-7 text-red-400" />
        </div>
        <h1 className="text-xl font-semibold text-slate-100 mb-2">ZIP Code Not Found</h1>
        <p className="text-slate-400 text-sm mb-5">We couldn't find data for ZIP code {zip}</p>
        <Link to="/" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
          Try another ZIP
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-120px)]">
      <TownHeader town={data?.town} loading={loading} />

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <TrendingUpIcon className="w-4.5 h-4.5 text-orange-400" />
            <h2 className="text-lg font-semibold text-slate-100">
              What's Trending
              {data?.town?.city && (
                <span className="text-slate-500 font-normal ml-1.5">in {data.town.city}</span>
              )}
            </h2>
          </div>
          {data?.legend && (
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gold-400 hover:text-gold-300 border border-gold-500/25 hover:border-gold-500/40 rounded-lg transition-all hover:bg-gold-500/5"
            >
              <BookOpenIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Urban Legend</span>
            </button>
          )}
        </div>

        {showLegend && data?.legend && (
          <div className="mb-5 p-5 bg-slate-900/60 rounded-xl border border-gold-500/15">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gold-400 mb-2">{data.legend.title}</h3>
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

        {data?.town?.city && !loading && (
          <div className="mb-5 bg-slate-900/70 rounded-xl border border-slate-800/50 shadow-lg shadow-black/10">
            <div className="px-5 py-4 border-b border-slate-800/40">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2.5">
                <span className="text-orange-400">
                  <NewspaperIcon className="w-4.5 h-4.5" />
                </span>
                Local News
              </h3>
            </div>
            <div className="p-4">
              <TrendingNews city={data.town.city} />
            </div>
          </div>
        )}

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

        <StatsBar data={data} loading={loading} />
      </div>
    </div>
  )
}

function StatsBar({ data, loading }) {
  const stats = [
    { label: 'Hotels', value: data?.hotels?.length || 0 },
    { label: 'Restaurants', value: data?.restaurants?.length || 0 },
    { label: 'Activities', value: data?.activities?.length || 0 },
    { label: 'Stories', value: data?.legend ? 1 : 0 },
  ]

  if (loading) {
    return (
      <div className="mt-5 flex items-center justify-center gap-6 py-4 border-t border-slate-800/40">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse flex items-center gap-2">
            <div className="w-8 h-5 bg-slate-800/60 rounded" />
            <div className="w-16 h-4 bg-slate-800/40 rounded" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 border-t border-slate-800/40">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-2">
          <span className="text-lg font-semibold text-orange-400">{stat.value}</span>
          <span className="text-sm text-slate-500">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}

