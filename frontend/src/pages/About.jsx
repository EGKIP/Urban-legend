export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">About Urban Legend</h1>
      <div className="space-y-4 text-slate-300">
        <p>
          Urban Legend is a travel discovery app that helps you explore any town in the United States
          through its hotels, restaurants, activities, and a unique AI-generated story.
        </p>
        <p>
          Enter any US ZIP code to discover what makes that place special. Each town comes with
          its own urban legend, crafted by AI based on the location&apos;s characteristics.
        </p>
        <h2 className="text-xl font-semibold text-white mt-8 mb-4">How it works</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-400">
          <li>Enter a 5-digit US ZIP code</li>
          <li>View nearby hotels, restaurants, and activities</li>
          <li>Read a unique urban legend for that location</li>
          <li>Explore the interactive map</li>
        </ol>
      </div>
    </div>
  )
}

