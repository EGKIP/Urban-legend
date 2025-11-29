import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <nav className={`flex items-center justify-between px-6 py-3 ${isHome ? 'border-b border-transparent' : 'border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-md'} sticky top-0 z-50 transition-all`}>
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-shadow">
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-slate-100 group-hover:text-orange-400 transition-colors">
            Urban Legend
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            to="/about"
            className={`text-sm font-medium transition-colors ${location.pathname === '/about' ? 'text-orange-400' : 'text-slate-400 hover:text-slate-200'}`}
          >
            About
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800/40 px-6 py-5 bg-slate-950/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            Urban Legend &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-5 text-sm text-slate-500">
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

