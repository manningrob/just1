import React from 'react';
import { Menu, X } from 'lucide-react';
import { useMenu } from '../hooks/useMenu';

export function Header() {
  const { isOpen, toggleMenu } = useMenu();

  return (
    <header className="fixed top-0 left-0 right-0 px-8 py-6 flex items-center bg-white/80 backdrop-blur-sm z-50">
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>
      
      <a 
        href="https://just1.co" 
        className="text-3xl font-bold flex-1 text-center lg:text-left lg:ml-6 hover:opacity-80 transition-opacity"
      >
        just one.
      </a>
      <div className="w-10 lg:hidden">
        {/* Spacer div to help center the logo */}
      </div>
    </header>
  );
}