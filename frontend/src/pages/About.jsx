import { Link } from 'react-router-dom'
import { MapPinIcon, BuildingIcon, ForkKnifeIcon, CompassIcon, SparklesIcon, MapIcon, NewspaperIcon } from '../components/Icons'

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-700/40">
      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-orange-400" />
      </div>
      <div>
        <h3 className="text-slate-100 font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function StepItem({ number, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-slate-100 font-semibold mb-1">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6 shadow-lg shadow-orange-500/20">
          <MapPinIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">About Urban Legend</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Discover the stories, places, and hidden gems of every town in the United States.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6 mb-10">
        <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed mb-4">
          Urban Legend transforms how you explore your surroundings. Whether you&apos;re planning a road trip,
          relocating to a new city, or simply curious about a place, we bring together everything
          you need to know in one beautiful dashboard.
        </p>
        <p className="text-slate-400 leading-relaxed">
          Every town has a story. We use AI to craft unique urban legends inspired by each
          location&apos;s geography, history, and character, giving every place its own mythology.
        </p>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-5">Features</h2>
        <div className="grid gap-4">
          <FeatureCard
            icon={BuildingIcon}
            title="Hotels & Accommodations"
            description="Find top-rated hotels near any location with ratings, reviews, and price ranges."
          />
          <FeatureCard
            icon={ForkKnifeIcon}
            title="Restaurants & Dining"
            description="Discover local eateries from casual spots to fine dining, with cuisine types and ratings."
          />
          <FeatureCard
            icon={CompassIcon}
            title="Activities & Attractions"
            description="Explore things to do including entertainment, outdoor activities, and local attractions."
          />
          <FeatureCard
            icon={SparklesIcon}
            title="AI Urban Legends"
            description="Every town gets a unique, AI-generated story inspired by its location and character."
          />
          <FeatureCard
            icon={MapIcon}
            title="Interactive Map"
            description="View all places on an interactive map with markers for hotels, restaurants, and activities."
          />
          <FeatureCard
            icon={NewspaperIcon}
            title="Local News"
            description="We compile the latest trending news from Google News for your area, keeping you informed about what's happening locally."
          />
        </div>
      </div>

      {/* How it works */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-white mb-5">How It Works</h2>
        <div className="space-y-5">
          <StepItem
            number={1}
            title="Search by ZIP or City"
            description="Enter any US ZIP code or search for a city name to get started."
          />
          <StepItem
            number={2}
            title="Explore the Dashboard"
            description="View curated hotels, restaurants, and activities with ratings and details."
          />
          <StepItem
            number={3}
            title="Read the Legend"
            description="Discover the unique AI-generated urban legend crafted for that location."
          />
          <StepItem
            number={4}
            title="Navigate the Map"
            description="Use the interactive map to see where everything is located."
          />
        </div>
      </div>

      {/* Tech */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/30 p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Built With</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'OpenAI', 'Yelp Fusion', 'Leaflet'].map((tech) => (
            <span key={tech} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-orange-500/20"
        >
          <MapPinIcon className="w-4 h-4" />
          Start Exploring
        </Link>
      </div>

      {/* Footer note */}
      <p className="text-center text-slate-500 text-sm mt-8">
        Made with curiosity. Explore responsibly.
      </p>
    </div>
  )
}

