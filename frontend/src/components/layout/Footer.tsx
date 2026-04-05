export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TORIN. All rights reserved.
          </div>
          <div className="text-gray-500 text-xs">
            Disclaimer: Trading involves risk. Past performance is not indicative of future results.
          </div>
        </div>
      </div>
    </footer>
  )
}
