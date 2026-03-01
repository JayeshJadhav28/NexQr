'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
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
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-to-use" className="text-gray-600 hover:text-gray-900 transition-colors">
                  How to Use
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-24 flex-grow">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About NexQR</h1>
          
          <p className="text-lg text-gray-700 mb-8">
            Welcome to NexQR – your next-generation QR code generator built for simplicity, speed, and customization.
          </p>
          
          <p className="text-gray-600 mb-8">
            At NexQR, we believe that creating powerful digital connections should be effortless. 
            Whether you&apos;re sharing a website, contact info, Wi-Fi credentials, or any custom data, 
            NexQR turns it into a clean, scannable QR code in seconds.
          </p>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 Why NexQR?</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Modern UI, Smooth UX</strong> – Fast, clutter-free, and mobile-friendly.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Custom QR Codes</strong> – Personalize with colors, sizes, and logos.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Instant Generation</strong> – Get your QR code in real time.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Secure & Private</strong> – No data is stored or tracked.</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Always Free</strong> – No ads. No sign-ups. Just QR codes.</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Built for Everyone</h2>
            <p className="text-gray-600 mb-4">NexQR is designed for:</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Small businesses sharing menus or links</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Event organizers offering quick access to info</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Students & developers integrating QR into projects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Marketers who need fast and branded QR generation</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🛠️ Built with Passion</h2>
            <p className="text-gray-600">
              NexQR is powered by modern web technologies and driven by the vision of making QR tools more intuitive and accessible. 
              Whether you&apos;re tech-savvy or a first-time user, NexQR delivers a seamless experience.
            </p>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
              Try NexQR Now
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 bg-white/80 backdrop-blur-sm border-t border-white/20 mt-auto">
        <div className="container mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} NexQR. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ by Jayesh</p>
        </div>
      </footer>
    </div>
  );
}
