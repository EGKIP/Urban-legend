import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPinIcon } from '../components/Icons'

const API_URL = 'http://localhost:8000'

const FEATURED_TOWNS = [
  { zip: '10001', name: 'New York', state: 'NY' },
  { zip: '90210', name: 'Beverly Hills', state: 'CA' },
  { zip: '02101', name: 'Boston', state: 'MA' },
  { zip: '60601', name: 'Chicago', state: 'IL' },
  { zip: '33139', name: 'Miami Beach', state: 'FL' },
  { zip: '98101', name: 'Seattle', state: 'WA' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  const isZip = /^\d{5}$/.test(query.trim())
  const isValidQuery = query.trim().length >= 2

  // Use browser geolocation
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported by your browser')
      return
    }
    setLocating(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            { headers: { 'User-Agent': 'UrbanLegend/1.0' } }
          )
          if (res.ok) {
            const data = await res.json()
            const zip = data.address?.postcode
            if (zip && /^\d{5}/.test(zip)) {
              navigate(`/town/${zip.slice(0, 5)}`)
              return
            }
          }
          setError('Could not determine your ZIP code')
        } catch {
          setError('Failed to get location data')
        } finally {
          setLocating(false)
        }
      },
      () => {
        setError('Location access denied')
        setLocating(false)
      },
      { timeout: 10000 }
    )
  }

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim() || query.trim().length < 2 || isZip) {
      setSuggestions([])
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/api/autocomplete?query=${encodeURIComponent(query)}`)
        if (res.ok) {
          const data = await res.json()
          setSuggestions(data.suggestions || [])
          setSelectedIndex(-1)
        }
      } catch {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(debounceRef.current)
  }, [query, isZip])

  const handleSelectSuggestion = async (suggestion) => {
    setQuery(suggestion.display)
    setSuggestions([])
    setShowSuggestions(false)
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/geocode?query=${encodeURIComponent(suggestion.display)}`)
      if (res.ok) {
        const data = await res.json()
        if (data.zip) {
          navigate(`/town/${data.zip}`)
          return
        }
      }
      setError('Could not find ZIP for this location')
    } catch {
      setError('Location not found')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelectSuggestion(suggestions[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setError('')
    setShowSuggestions(false)

    if (isZip) {
      navigate(`/town/${trimmed}`)
    } else if (isValidQuery) {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/geocode?query=${encodeURIComponent(trimmed)}`)
        if (!res.ok) throw new Error('Location not found')
        const data = await res.json()
        if (data.zip) {
          navigate(`/town/${data.zip}`)
        } else {
          setError('Could not find a ZIP code for that location')
        }
      } catch {
        setError('Location not found. Try a ZIP code instead.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-16 flex-1 overflow-hidden">
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gold-400/5 rounded-full blur-[120px] animate-pulse-glow animation-delay-200" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 animate-slide-up">
          Discover the <span className="text-gradient">legend</span> of your town
        </h1>
        <p className="text-slate-400 text-base md:text-lg mb-8 max-w-lg mx-auto opacity-0 animate-slide-up animation-delay-200">
          Search by ZIP code or city name to explore local spots and AI-generated stories.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`relative flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto opacity-0 animate-slide-up animation-delay-400 transition-transform duration-200 ${isFocused ? 'scale-[1.02]' : ''}`}
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="ZIP code or City, State"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setError(''); setShowSuggestions(true) }}
              onFocus={() => { setIsFocused(true); setShowSuggestions(true) }}
              onBlur={() => { setIsFocused(false); setTimeout(() => setShowSuggestions(false), 150) }}
              onKeyDown={handleKeyDown}
              className="w-full px-5 py-3 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl text-slate-100 text-base placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-center sm:text-left transition-all"
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                {suggestions.map((s, idx) => (
                  <li key={`${s.city}-${s.state}`}>
                    <button
                      type="button"
                      onMouseDown={() => handleSelectSuggestion(s)}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                        idx === selectedIndex
                          ? 'bg-orange-500/20 text-orange-400'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <MapPinIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                      <span>{s.display}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValidQuery && !isZip || loading}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Searching</span>
              </>
            ) : 'Explore'}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-red-400 text-sm animate-slide-up">{error}</p>
        )}

        <button
          onClick={handleUseLocation}
          disabled={locating}
          className="mt-5 flex items-center gap-2 text-slate-400 hover:text-orange-400 disabled:text-slate-600 transition-colors mx-auto text-sm"
        >
          {locating ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Locating...</span>
            </>
          ) : (
            <>
              <MapPinIcon className="w-4 h-4" />
              <span>Use my location</span>
            </>
          )}
        </button>

        <div className="mt-12">
          <p className="text-slate-500 text-sm mb-3">Popular destinations</p>
          <div className="flex flex-wrap justify-center gap-2">
            {FEATURED_TOWNS.map((town) => (
              <button
                key={town.zip}
                onClick={() => navigate(`/town/${town.zip}`)}
                className="px-4 py-2 bg-slate-800/40 border border-slate-700/50 hover:border-orange-500/40 hover:bg-slate-800/70 rounded-full text-sm text-slate-300 hover:text-orange-400 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/30"
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

