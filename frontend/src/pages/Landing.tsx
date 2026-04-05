import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Footer from '@/components/layout/Footer'
import { TrendingUp, Radio, BarChart3 } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Live Trading
              <span className="text-accent"> Analysis</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Real-time market commentary and trade insights for Nifty and BTC/USD.
              Follow along with professional analysis as markets move.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analysis/nifty">
                <Button size="lg">
                  View Nifty Analysis
                </Button>
              </Link>
              <Link to="/analysis/btcusd">
                <Button variant="secondary" size="lg">
                  View BTC/USD Analysis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark-lighter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Radio className="w-8 h-8 text-accent" />}
              title="Live Commentary"
              description="Real-time trade updates as they happen. No delays, no replays."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-profit" />}
              title="Clear Signals"
              description="Easy to follow long and short calls with entry, target, and exit levels."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-accent" />}
              title="Multiple Markets"
              description="Coverage of Nifty for Indian markets and BTC/USD for crypto traders."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-dark p-6 rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
