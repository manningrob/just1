import React from 'react';
import { Sparkles } from 'lucide-react';
import { useMenu } from '../hooks/useMenu';

const MENU_ITEMS = [
  { 
    label: 'Create Your Own', 
    href: 'https://just1.co',
    primary: true 
  },
  { 
    label: 'Everyday Collection', 
    href: 'https://shop.just1.co/collections/everyday' 
  },
  { 
    label: 'Unclaimed Originals', 
    href: 'https://shop.just1.co/collections/unclaimed' 
  },
    { 
    label: 'Recently Purchased', 
    href: 'https://shop.just1.co/collections/purchased' 
  },
  { 
    label: 'Contact', 
    href: 'https://shop.just1.co/pages/contact' 
  },
  { 
    label: 'About Us', 
    href: 'https://shop.just1.co/pages/about-us' 
  },
];

export function SideMenu() {
  const { isOpen, closeMenu } = useMenu();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu */}
      <div 
        className={`
          fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-white z-40 
          transition-transform duration-300 ease-in-out
          w-full lg:w-80 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <nav className="p-4">
          <ul className="space-y-1">
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className={`
                    block px-4 py-2 rounded-lg transition-all
                    ${item.primary 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 flex items-center justify-between group shadow-md' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                  {item.primary && (
                    <Sparkles className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
