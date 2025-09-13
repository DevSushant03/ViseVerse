import React from 'react'

export default function Footer() {
  return (
     <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
            
              <span className="text-xl text-white font-bold">ViseVerse</span>
            </div>
            <div className="text-purple-200">
              © {new Date().getFullYear()} ViseVerse. Transforming text with AI. <br/>
              <p>Devloped by - <a title='view' className='font-bold hover:opacity-50 hover:underline' href="https://devsushant03.netlify.app">Sushant Nachanekar</a></p>
            </div>
          </div>
        </div>
      </footer>
  )
}
