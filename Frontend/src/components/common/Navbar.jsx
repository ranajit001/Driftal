import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 glass-card border-0 border-b border-white/10">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IM</span>
            </div>
            <h1 className="text-xl font-bold text-white">Interface Monitor</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search interfaces, logs..."
                className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-smooth"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Notifications */}
            <button className="relative p-2 glass rounded-lg hover:bg-white/10 transition-smooth">
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center space-x-2 p-2 glass rounded-lg hover:bg-white/10 transition-smooth">
              <User className="w-5 h-5 text-gray-300" />
              <span className="text-gray-300 text-sm hidden sm:block">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
