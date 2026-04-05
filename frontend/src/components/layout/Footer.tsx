export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} <span className="text-white font-medium">TORIN</span>. All rights reserved.
          </div>
          <div className="text-gray-600 text-xs max-w-md text-center md:text-right">
            Disclaimer: Trading involves risk. Past performance is not indicative of future results.
          </div>
        </div>
      </div>
    </footer>
  )
}
