import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navbar */}
      <nav className={`flex items-center justify-between px-6 py-4 ${isHome ? 'border-b border-transparent' : 'border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm'} sticky top-0 z-50 transition-all`}>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
            Urban Legend
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
          >
            About
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            Urban Legend &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <a href="https://github.com/EGKIP/Urban-legend" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

