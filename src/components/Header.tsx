'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 py-4 px-6 fixed w-full top-0 left-0 z-50 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 relative">
            <Image src="/favicon.svg" alt="NexQR Logo" fill sizes="32px" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">NexQR</h1>
            <p className="text-sm text-gray-600">Generate QR codes instantly</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
          >
            Home
          </Link>
          <Link 
            href="/how-to-use" 
            className={`${pathname === '/how-to-use' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
          >
            How to Use
          </Link>
          <Link 
            href="/about" 
            className={`${pathname === '/about' ? 'text-blue-600 font-medium' : 'text-gray-600'} hover:text-gray-900 transition-colors`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
