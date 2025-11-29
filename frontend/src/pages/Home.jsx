import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPinIcon } from '../components/Icons'

const FEATURED_TOWNS = [
  { zip: '10001', name: 'New York', state: 'NY' },
  { zip: '90210', name: 'Beverly Hills', state: 'CA' },
  { zip: '02101', name: 'Boston', state: 'MA' },
  { zip: '60601', name: 'Chicago', state: 'IL' },
]

export default function Home() {
  const [zip, setZip] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (zip.length === 5) {
      navigate(`/town/${zip}`)
    }
  }

  const handleZipChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setZip(value)
  }

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-16 min-h-[calc(100vh-130px)] overflow-hidden">
      {/* Background glow effects - reduced opacity */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gold-400/5 rounded-full blur-[120px] animate-pulse-glow animation-delay-200" />

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 animate-slide-up">
          Discover the <span className="text-gradient">legend</span> of your town
        </h1>
        <p className="text-slate-400 text-base md:text-lg mb-8 max-w-lg mx-auto opacity-0 animate-slide-up animation-delay-200">
          Enter any US ZIP code to explore hotels, restaurants, activities, and uncover a unique AI-generated story.
        </p>

        {/* ZIP input form */}
        <form
          onSubmit={handleSubmit}
          className={`relative flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto opacity-0 animate-slide-up animation-delay-400 transition-transform duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}
        >
          <div className="relative flex-1">
            <input
              type="text"
              inputMode="numeric"
              placeholder="Enter ZIP code"
              value={zip}
              onChange={handleZipChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-5 py-3 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl text-slate-100 text-base placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-center sm:text-left transition-all"
            />
            {zip.length > 0 && zip.length < 5 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                {5 - zip.length} more
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={zip.length !== 5}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20 disabled:hover:shadow-none"
          >
            Explore
          </button>
        </form>

        {/* Location button */}
        <button className="mt-5 flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors mx-auto text-sm">
          <MapPinIcon className="w-4 h-4" />
          Use my location
        </button>

        {/* Featured towns */}
        <div className="mt-12">
          <p className="text-slate-500 text-sm mb-3">Or explore a featured town</p>
          <div className="flex flex-wrap justify-center gap-2">
            {FEATURED_TOWNS.map((town) => (
              <button
                key={town.zip}
                onClick={() => navigate(`/town/${town.zip}`)}
                className="px-4 py-1.5 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/50 rounded-full text-sm text-slate-300 hover:text-slate-100 transition-all"
              >
                {town.name}, {town.state}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

