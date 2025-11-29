import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TownHeader from '../components/TownHeader'

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
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
        <p className="text-slate-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <TownHeader town={data?.town} loading={loading} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">
            <span className="text-orange-500">Hotels</span>
          </h2>
          <p className="text-slate-500">Coming soon...</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">
            <span className="text-orange-500">Restaurants</span>
          </h2>
          <p className="text-slate-500">Coming soon...</p>
        </div>

        <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
          <h2 className="text-lg font-semibold text-white mb-4">
            <span className="text-orange-500">Activities</span>
          </h2>
          <p className="text-slate-500">Coming soon...</p>
        </div>
      </div>

      <div className="mt-8 bg-slate-900 rounded-xl p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-gold-400 mb-4">Urban Legend</h2>
        <p className="text-slate-500">The legend will appear here...</p>
      </div>
    </div>
  )
}

