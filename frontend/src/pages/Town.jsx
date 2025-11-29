import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownHeader from '../components/TownHeader'
import DashboardCard from '../components/DashboardCard'
import LegendCard from '../components/LegendCard'

const API_URL = 'http://localhost:8000'

export default function Town() {
  const { zip } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      <div className="px-6 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-500 mb-2">ZIP Code Not Found</h1>
        <p className="text-slate-400 mb-6">We couldn't find data for ZIP code {zip}</p>
        <Link to="/" className="text-orange-500 hover:text-orange-400 underline">
          ← Try another ZIP code
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <TownHeader town={data?.town} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Hotels"
          icon="🏨"
          items={data?.hotels}
          loading={loading}
          emptyText="Hotel data coming soon..."
        />
        <DashboardCard
          title="Restaurants"
          icon="🍽️"
          items={data?.restaurants}
          loading={loading}
          emptyText="Restaurant data coming soon..."
        />
        <DashboardCard
          title="Activities"
          icon="🎯"
          items={data?.activities}
          loading={loading}
          emptyText="Activity data coming soon..."
        />
      </div>

      <div className="mt-8">
        <LegendCard legend={data?.legend} loading={loading} />
      </div>
    </div>
  )
}

