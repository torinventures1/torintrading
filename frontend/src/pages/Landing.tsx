import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Footer from '@/components/layout/Footer'
import { TrendingUp, Radio, BarChart3, ArrowRight } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center pt-16 relative overflow-hidden">
        {/* Gradient orb background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Trading is not hard.
              <br />
              <span className="text-gradient">We make it hard.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Real-time market commentary and trade insights for Nifty and BTC/USD.
              Follow along with professional analysis as markets move.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/analysis/nifty">
                <Button size="lg" className="group">
                  View Nifty Analysis
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Built for <span className="text-purple">serious traders</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Everything you need to follow professional trades in real-time
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Radio className="w-6 h-6" />}
              title="Live Commentary"
              description="Real-time trade updates as they happen. No delays, no replays."
            />
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Clear Signals"
              description="Easy to follow long and short calls with entry, target, and exit levels."
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
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
    <div className="bg-white/[0.02] p-8 rounded-2xl border border-white/5 hover:border-purple/30 transition-all duration-300 card-hover group">
      <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-5 text-purple group-hover:bg-purple/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}
