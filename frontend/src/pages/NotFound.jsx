import { Link } from 'react-router-dom'
import { MapPinIcon } from '../components/Icons'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-6">
        <MapPinIcon className="w-10 h-10 text-slate-600" />
      </div>
      <h1 className="text-4xl font-bold text-slate-100 mb-3">404</h1>
      <p className="text-slate-400 text-lg mb-6">Page not found</p>
      <p className="text-slate-500 text-sm mb-8 max-w-sm text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20"
      >
        <MapPinIcon className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  )
}

