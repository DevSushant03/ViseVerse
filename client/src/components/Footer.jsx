import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo / Name */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <span className="text-2xl font-extrabold text-purple-400">ViseVerse</span>
          </div>

          {/* Copyright & Info */}
          <div className="text-center md:text-right text-gray-300 text-sm">
            <p>
              &copy; {new Date().getFullYear()} ViseVerse. All rights reserved.
            </p>
            <p className="mt-1">Transforming text with AI.</p>
            <p className="mt-1">
              Developed by -{' '}
              <a
                href="https://devsushant03.netlify.app"
                title="View Developer Portfolio"
                className="font-semibold text-purple-400 hover:text-purple-300 hover:underline"
              >
                Sushant Nachanekar
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
