'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 border-t border-gray-100">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/how-to-use" 
              className={`${pathname === '/how-to-use' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              How to Use
            </Link>
            <Link 
              href="/about" 
              className={`${pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;
