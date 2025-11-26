function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">UL</span>
          </div>
          <span className="text-xl font-semibold text-white">Urban Legend</span>
        </div>
        <div className="text-slate-400 text-sm">About</div>
      </nav>

      {/* Hero section */}
      <main className="flex flex-col items-center justify-center px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Discover the story of your town
        </h1>
        <p className="text-slate-400 text-lg text-center mb-8 max-w-xl">
          Enter your ZIP code to see hotels, food, activities, and an AI-generated urban legend.
        </p>

        {/* ZIP input */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter ZIP code"
            maxLength={5}
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors">
            Explore
          </button>
        </div>

        <button className="mt-6 flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Use my location
        </button>
      </main>
    </div>
  )
}

export default App
