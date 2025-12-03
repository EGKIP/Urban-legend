import { useState, useEffect } from 'react'
import { ChevronRightIcon } from './Icons'

const API_URL = 'http://localhost:8000'

export default function TrendingNews({ city }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!city) return
    setLoading(true)
    setError(false)

    fetch(`${API_URL}/api/trending-news?city=${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => setArticles(data.articles || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [city])

  if (loading) {
    return (
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse flex items-center gap-3 p-2.5 bg-slate-800/30 rounded-lg">
            <div className="w-16 h-12 bg-slate-800/60 rounded flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-slate-800/60 rounded w-4/5 mb-2" />
              <div className="h-3 bg-slate-800/40 rounded w-2/5" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error || articles.length === 0) return null

  return (
    <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
      {articles.map((article, idx) => (
        <NewsItem key={idx} article={article} />
      ))}
    </div>
  )
}

function NewsItem({ article }) {
  const formatTime = (dateStr) => {
    if (!dateStr) return ''
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
      if (diffHours < 1) return 'Just now'
      if (diffHours < 24) return `${diffHours}h ago`
      const diffDays = Math.floor(diffHours / 24)
      return diffDays === 1 ? '1d ago' : `${diffDays}d ago`
    } catch {
      return ''
    }
  }

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 border border-transparent hover:border-slate-700/40 transition-all group"
    >
      {article.imageUrl ? (
        <img
          src={article.imageUrl}
          alt=""
          className="w-16 h-12 rounded object-cover flex-shrink-0"
          onError={(e) => e.target.style.display = 'none'}
        />
      ) : (
        <div className="w-1.5 h-1.5 mt-2 bg-orange-400 rounded-full flex-shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-slate-200 leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors">
          {article.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {article.source && <span className="text-xs text-slate-500">{article.source}</span>}
          {article.publishedAt && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-500">{formatTime(article.publishedAt)}</span>
            </>
          )}
          {article.isVideo && (
            <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded font-medium">Video</span>
          )}
        </div>
      </div>
      <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-0.5" />
    </a>
  )
}

