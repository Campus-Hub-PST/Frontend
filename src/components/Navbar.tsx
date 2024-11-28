import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Bell, Users, Search, Menu } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const links = [
    { path: '/', icon: Calendar, label: 'Events' },
    { path: '/announcements', icon: Bell, label: 'Announcements' },
    { path: '/study-groups', icon: Users, label: 'Study Groups' },
    { path: '/lost-found', icon: Search, label: 'Lost & Found' },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl">Campus Hub</Link>
          
          <div className="hidden md:flex space-x-8">
            {links.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 hover:text-purple-400 transition-colors ${
                  location.pathname === path ? 'text-purple-500' : ''
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {links.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 py-2 hover:text-purple-400 transition-colors ${
                  location.pathname === path ? 'text-purple-500' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}