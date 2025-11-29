import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownHeader from '../components/TownHeader'
import DashboardCard from '../components/DashboardCard'

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
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">ZIP Code Not Found</h1>
        <p className="text-slate-400 mb-8 text-lg">We couldn't find data for ZIP code {zip}</p>
        <Link to="/" className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors">
          Try another ZIP code
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <TownHeader town={data?.town} loading={loading} />

      {/* Trending Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-orange-500">What's Trending</span>
            <span className="text-slate-400 font-normal text-lg">in {data?.town?.city || '...'}</span>
          </h2>
          {data?.legend && (
            <button
              onClick={() => setShowLegend(!showLegend)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gold-400 hover:text-gold-300 border border-gold-500/30 hover:border-gold-500/50 rounded-lg transition-all hover:bg-gold-500/5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Urban Legend
            </button>
          )}
        </div>

        {/* Legend Modal */}
        {showLegend && data?.legend && (
          <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 rounded-2xl border border-gold-500/20 animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gold-400 mb-2">{data.legend.title}</h3>
                <p className="text-slate-300 leading-relaxed">{data.legend.story}</p>
              </div>
              <button onClick={() => setShowLegend(false)} className="text-slate-500 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Top Hotels"
            icon="🏨"
            items={data?.hotels}
            loading={loading}
            emptyText="Hotel data coming soon..."
          />
          <DashboardCard
            title="Popular Eats"
            icon="🍽️"
            items={data?.restaurants}
            loading={loading}
            emptyText="Restaurant data coming soon..."
          />
          <DashboardCard
            title="Things to Do"
            icon="🎯"
            items={data?.activities}
            loading={loading}
            emptyText="Activity data coming soon..."
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Hotels" value={data?.hotels?.length || 0} loading={loading} color="orange" />
          <StatCard label="Restaurants" value={data?.restaurants?.length || 0} loading={loading} color="green" />
          <StatCard label="Activities" value={data?.activities?.length || 0} loading={loading} color="blue" />
          <StatCard label="Stories" value={data?.legend ? 1 : 0} loading={loading} color="gold" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, loading, color }) {
  const colors = {
    orange: 'from-orange-500/20 to-orange-600/10 text-orange-500',
    green: 'from-green-500/20 to-green-600/10 text-green-500',
    blue: 'from-blue-500/20 to-blue-600/10 text-blue-500',
    gold: 'from-gold-500/20 to-gold-600/10 text-gold-400',
  }

  if (loading) {
    return <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
  }

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-br ${colors[color]} bg-slate-900/50 border border-slate-800`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  )
}

