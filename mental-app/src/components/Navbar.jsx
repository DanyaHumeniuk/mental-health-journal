import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 py-3 px-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/android-chrome-192x192.png" 
            alt="Logo" 
            className="h-8 w-8 rounded-md transition-transform group-hover:rotate-12"
          />
          <span className="font-bold text-xl text-gray-800 tracking-tight">
            Mental Journal
          </span>
        </Link>

        {/* Your Credit */}
        <div className="text-sm text-gray-500 font-medium">
          Developed by <span className="text-green-600 font-semibold">Danylo Humeniuk</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;