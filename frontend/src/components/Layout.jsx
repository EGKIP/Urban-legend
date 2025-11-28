import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">UL</span>
          </div>
          <span className="text-xl font-semibold text-white">Urban Legend</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
            About
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-4">
        <p className="text-center text-slate-500 text-sm">
          Urban Legend &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

