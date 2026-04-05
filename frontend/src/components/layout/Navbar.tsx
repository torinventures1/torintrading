import { Link, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const location = useLocation()
  const isAnalysisPage = location.pathname.startsWith('/analysis')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:text-purple transition-colors">
            TORIN
          </Link>

          {!isAnalysisPage && (
            <Link to="/analysis/nifty">
              <Button variant="primary">
                Today's Analysis
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
