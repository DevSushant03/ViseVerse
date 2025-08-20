import React from 'react'

export default function Footer() {
  return (
     <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-violet-400 rounded-lg flex items-center justify-center">
                {/* <Zap className="w-5 h-5 text-white" /> */}
              </div>
              <span className="text-xl font-bold">ViseVerse</span>
            </div>
            <div className="text-purple-300">
              © {new Date().getFullYear()} ViseVerse. Transforming text with AI.
            </div>
          </div>
        </div>
      </footer>
  )
}
