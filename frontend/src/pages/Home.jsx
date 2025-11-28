import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-[120px] animate-pulse-glow animation-delay-200" />

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-slide-up">
          Discover the <span className="text-gradient">legend</span> of your town
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto opacity-0 animate-slide-up animation-delay-200">
          Enter any US ZIP code to explore hotels, restaurants, activities, and uncover a unique AI-generated story.
        </p>

        {/* ZIP input form */}
        <form
          onSubmit={handleSubmit}
          className={`relative flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto opacity-0 animate-slide-up animation-delay-400 transition-transform duration-300 ${isFocused ? 'scale-105' : ''}`}
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
              className="w-full px-6 py-4 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full text-white text-lg placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-center sm:text-left transition-all"
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
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:hover:scale-100"
          >
            Explore
          </button>
        </form>

        {/* Location button */}
        <button className="mt-6 flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mx-auto group">
          <svg className="w-5 h-5 group-hover:animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Use my location
        </button>

        {/* Featured towns */}
        <div className="mt-16">
          <p className="text-slate-500 text-sm mb-4">Or explore a featured town</p>
          <div className="flex flex-wrap justify-center gap-3">
            {FEATURED_TOWNS.map((town) => (
              <button
                key={town.zip}
                onClick={() => navigate(`/town/${town.zip}`)}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 hover:border-orange-500/50 rounded-full text-sm text-slate-300 hover:text-white transition-all"
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

