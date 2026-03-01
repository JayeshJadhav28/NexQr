'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';

interface QRType {
  icon: string;
  type: string;
  label: string;
  placeholder: string;
  pattern?: string;
  format?: string;
  validate?: (input: string) => boolean;
}

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [qrType, setQrType] = useState('URL');
  // Dynamic QR code size based on screen width
  const [qrSize, setQrSize] = useState(250);
  
  // Update QR size on window resize
  useEffect(() => {
    const updateQrSize = () => {
      const isMobile = window.innerWidth < 768;
      setQrSize(isMobile ? Math.min(window.innerWidth - 80, 220) : 250);
    };
    
    // Set initial size
    updateQrSize();
    
    // Add event listener
    window.addEventListener('resize', updateQrSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateQrSize);
  }, []);
  const [qrColor, setQrColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const errorLevel: 'L' | 'M' | 'Q' | 'H' = 'H'; // Fixed high error correction for better quality
  const [showTooltip, setShowTooltip] = useState(false);
  const [inputError, setInputError] = useState('');
  
  // Clear input when QR type changes
  useEffect(() => {
    setInput('');
    setInputError('');
  }, [qrType]);

  const qrTypes: QRType[] = [
    { 
      icon: '🌐', 
      type: 'URL', 
      label: 'Website URL', 
      placeholder: 'https://www.example.com',
      pattern: '^https?:\/\/.+\..+',
      format: 'Must start with http:// or https://',
      validate: (input) => input.startsWith('http://') || input.startsWith('https://')
    },
    { 
      icon: '📝', 
      type: 'TEXT', 
      label: 'Plain Text', 
      placeholder: 'Type any message or note here',
      validate: (input) => input.length > 0
    },
    { 
      icon: '📧', 
      type: 'EMAIL', 
      label: 'Email', 
      placeholder: 'example@gmail.com',
      pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
      format: 'Must be a valid email address (e.g., example@gmail.com)',
      validate: (input) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)
    },
    { 
      icon: '📱', 
      type: 'SMS', 
      label: 'SMS', 
      placeholder: '+1234567890',
      pattern: '^\+?[1-9]\d{9,14}$',
      format: 'Must be a valid phone number with country code (e.g., +1234567890)',
      validate: (input) => /^\+?[1-9]\d{9,14}$/.test(input)
    },
    { 
      icon: '📇', 
      type: 'VCARD', 
      label: 'vCard', 
      placeholder: 'Name: John Doe\nPhone: +1234567890\nEmail: john@gmail.com',
      format: 'Must include Name, Phone, and Email',
      validate: (input) => input.includes('Name:') && input.includes('Phone:') && input.includes('Email:')
    },
    { 
      icon: '📶', 
      type: 'WIFI', 
      label: 'WiFi', 
      placeholder: 'Network: MyWiFi\nPassword: MySecurePass\nType: WPA',
      format: 'Must include Network name and Password',
      validate: (input) => input.includes('Network:') && input.includes('Password:')
    },
    { 
      icon: '📄', 
      type: 'PDF', 
      label: 'PDF Link', 
      placeholder: 'https://example.com/document.pdf',
      pattern: '^https?:\/\/.+\.pdf$',
      format: 'Must be a valid PDF URL ending with .pdf',
      validate: (input) => /^https?:\/\/.+\.pdf$/i.test(input)
    },
    { 
      icon: '🖼️', 
      type: 'IMAGE', 
      label: 'Image Link', 
      placeholder: 'https://example.com/image.jpg',
      pattern: '^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$',
      format: 'Must be a valid image URL ending with .jpg, .png, .gif, etc.',
      validate: (input) => /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(input)
    },
    { 
      icon: '📍', 
      type: 'LOCATION', 
      label: 'Location', 
      placeholder: 'Lat: 40.7128, Long: -74.0060',
      format: 'Must be in format: Lat: number, Long: number',
      validate: (input) => {
        const lat = input.match(/Lat:\s*(-?\d+\.?\d*)/i)?.[1];
        const long = input.match(/Long:\s*(-?\d+\.?\d*)/i)?.[1];
        return lat !== undefined && long !== undefined &&
               parseFloat(lat) >= -90 && parseFloat(lat) <= 90 &&
               parseFloat(long) >= -180 && parseFloat(long) <= 180;
      }
    },
    { 
      icon: '📱', 
      type: 'APP', 
      label: 'App Store', 
      placeholder: 'https://play.google.com/store/apps/details?id=com.example',
      pattern: '^https?:\/\/(play\.google\.com|apps\.apple\.com).+',
      format: 'Must be a valid Play Store or App Store URL',
      validate: (input) => /^https?:\/\/(play\.google\.com\/store\/apps\/details\?id=|apps\.apple\.com\/(app|us)\/)/i.test(input)
    },
    { 
      icon: '💳', 
      type: 'PAYMENT', 
      label: 'Payment', 
      placeholder: 'UPI: username@upi',
      format: 'Must be in format: UPI: username@upi',
      validate: (input) => /^UPI:\s*[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/i.test(input)
    },
    { 
      icon: '📅', 
      type: 'EVENT', 
      label: 'Calendar Event', 
      placeholder: 'Title: My Event\nDate: 2025-05-02\nTime: 14:30',
      format: 'Must include Title, Date (YYYY-MM-DD), and Time (HH:MM)',
      validate: (input) => {
        const hasTitle = /Title:\s*.+/i.test(input);
        const hasValidDate = /Date:\s*\d{4}-\d{2}-\d{2}/i.test(input);
        const hasValidTime = /Time:\s*([01]\d|2[0-3]):[0-5]\d/i.test(input);
        return hasTitle && hasValidDate && hasValidTime;
      }
    }
  ];

  const selectedType = qrTypes.find(t => t.type === qrType);

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
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/how-to-use" className="text-gray-600 hover:text-gray-900 transition-colors">How to Use</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-3 sm:p-6 mt-20 overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-7xl"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-white/20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-3">NexQR Generator</h2>
            <p className="text-gray-600 text-lg">Customize and create QR codes instantly</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 overflow-hidden">
          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Select QR Code Type</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {qrTypes.map((type) => (
                <motion.button
                  key={type.type}
                  whileHover={{ scale: 1.02, backgroundColor: '#f3f4f6' }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-colors ${qrType === type.type ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border-2 border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setQrType(type.type)}
                >
                  <span className="text-2xl mb-2">{type.icon}</span>
                  <span className="text-sm text-gray-600">{type.label}</span>
                </motion.button>
              ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={qrTypes.find(t => t.type === qrType)?.placeholder || 'Enter details'}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black"
                  />
                  {qrType === 'URL' && (
                    <p className="text-sm text-gray-500">Example: https://www.google.com</p>
                  )}
                  {qrType === 'EMAIL' && (
                    <p className="text-sm text-gray-500">Example: john.doe@gmail.com</p>
                  )}
                  {qrType === 'SMS' && (
                    <p className="text-sm text-gray-500">Example: +91XXXXXXXXXX</p>
                  )}
                  {qrType === 'VCARD' && (
                    <p className="text-sm text-gray-500">Format: Name: John Doe<br/>Phone: +91XXXXXXXXXX<br/>Email: john@gmail.com</p>
                  )}
                  {qrType === 'WIFI' && (
                    <p className="text-sm text-gray-500">Format: Network: MyWiFi<br/>Password: MySecurePass<br/>Type: WPA</p>
                  )}
                  {qrType === 'PDF' && (
                    <p className="text-sm text-gray-500">Example: https://example.com/document.pdf</p>
                  )}
                  {qrType === 'IMAGE' && (
                    <p className="text-sm text-gray-500">Example: https://example.com/image.jpg</p>
                  )}
                  {qrType === 'LOCATION' && (
                    <p className="text-sm text-gray-500">Format: Lat: 19.0760, Long: 72.8777</p>
                  )}
                  {qrType === 'APP' && (
                    <p className="text-sm text-gray-500">Example: https://play.google.com/store/apps/details?id=com.example</p>
                  )}
                  {qrType === 'PAYMENT' && (
                    <p className="text-sm text-gray-500">Format: UPI: username@upi</p>
                  )}
                  {qrType === 'EVENT' && (
                    <p className="text-sm text-gray-500">Format: Title: Birthday Party<br/>Date: 2025-05-02<br/>Time: 14:30</p>
                  )}
                  {qrType === 'TEXT' && (
                    <p className="text-sm text-gray-500">Enter any text message or note</p>
                  )}
                </div>

                {qrType === 'WIFI' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="WiFi Network Name"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${!input.includes('Network:') ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black`}
                        value={input.split('\n').find(line => line.startsWith('Network:'))?.replace('Network:', '').trim() || ''}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const networkIndex = lines.findIndex(line => line.startsWith('Network:'));
                          if (networkIndex >= 0) {
                            lines[networkIndex] = `Network: ${e.target.value}`;
                          } else {
                            lines.unshift(`Network: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="password"
                        placeholder="WiFi Password"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${!input.includes('Password:') ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black`}
                        value={input.split('\n').find(line => line.startsWith('Password:'))?.replace('Password:', '').trim() || ''}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const passIndex = lines.findIndex(line => line.startsWith('Password:'));
                          if (passIndex >= 0) {
                            lines[passIndex] = `Password: ${e.target.value}`;
                          } else {
                            lines.push(`Password: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <select
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-black"
                        value={input.split('\n').find(line => line.startsWith('Type:'))?.replace('Type:', '').trim() || 'WPA'}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const typeIndex = lines.findIndex(line => line.startsWith('Type:'));
                          if (typeIndex >= 0) {
                            lines[typeIndex] = `Type: ${e.target.value}`;
                          } else {
                            lines.push(`Type: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                      </select>
                    </div>
                    {inputError && (
                      <p className="text-sm text-red-500">{inputError}</p>
                    )}
                  </div>
                )}

                {qrType === 'VCARD' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${!input.includes('Name:') ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black`}
                        value={input}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const nameIndex = lines.findIndex(line => line.startsWith('Name:'));
                          if (nameIndex >= 0) {
                            lines[nameIndex] = `Name: ${e.target.value}`;
                          } else {
                            lines.unshift(`Name: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${!input.includes('Phone:') ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black`}
                        value={input}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const phoneIndex = lines.findIndex(line => line.startsWith('Phone:'));
                          if (phoneIndex >= 0) {
                            lines[phoneIndex] = `Phone: ${e.target.value}`;
                          } else {
                            lines.push(`Phone: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className={`w-full px-4 py-3 rounded-lg border-2 ${!input.includes('Email:') ? 'border-red-300' : 'border-gray-200'} focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder:text-black text-black`}
                        value={input}
                        onChange={(e) => {
                          const lines = input.split('\n');
                          const emailIndex = lines.findIndex(line => line.startsWith('Email:'));
                          if (emailIndex >= 0) {
                            lines[emailIndex] = `Email: ${e.target.value}`;
                          } else {
                            lines.push(`Email: ${e.target.value}`);
                          }
                          const newInput = lines.join('\n');
                          setInput(newInput);
                          if (selectedType?.validate && !selectedType.validate(newInput)) {
                            setInputError(selectedType.format || 'Invalid format');
                          } else {
                            setInputError('');
                          }
                        }}
                      />
                    </div>
                    {inputError && (
                      <p className="text-sm text-red-500">{inputError}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl flex flex-col items-center justify-center min-h-[350px] sm:min-h-[400px] overflow-hidden">
              {input ? (
                <div className="space-y-4 w-full mx-auto text-center">
                  <div 
                    className="relative group w-full flex justify-center"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    <div className="bg-white p-2 sm:p-3 rounded-xl shadow-sm max-w-full inline-block">
                      <QRCodeSVG
                        value={input}
                        size={qrSize}
                        level={errorLevel}
                        includeMargin={true}
                        fgColor={qrColor}
                        bgColor={bgColor}
                        className="max-w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    {showTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-xs sm:text-sm whitespace-nowrap z-10"
                      >
                        Click Download to save
                      </motion.div>
                    )}
                  </div>
                  <div className="space-y-3 mt-6">
                    <button
                      className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md overflow-hidden text-sm sm:text-base"
                      onClick={() => {
                        const svg = document.querySelector('svg');
                        if (svg) {
                          const svgData = new XMLSerializer().serializeToString(svg);
                          const canvas = document.createElement('canvas');
                          const ctx = canvas.getContext('2d');
                          // Create an image element
                          const img = document.createElement('img');
                          img.onload = () => {
                            // Set canvas to a high resolution size for better quality exports
                            const exportScale = 4; // Increased scale factor for higher resolution
                            canvas.width = qrSize * exportScale;
                            canvas.height = qrSize * exportScale;
                            
                            if (ctx) {
                              // Enable high quality image rendering
                              ctx.imageSmoothingEnabled = false; // Disable smoothing for sharper QR codes
                              
                              // Draw background
                              ctx.fillStyle = bgColor;
                              ctx.fillRect(0, 0, canvas.width, canvas.height);
                              
                              // Add padding around the QR code (10% of the size)
                              const padding = Math.floor(qrSize * exportScale * 0.1);
                              const drawSize = qrSize * exportScale - (padding * 2);
                              
                              // Draw QR code at high resolution
                              ctx.drawImage(img, padding, padding, drawSize, drawSize);

                              // Create download link with high quality PNG
                              const pngFile = canvas.toDataURL('image/png', 1.0); // Use maximum quality
                              const downloadLink = document.createElement('a');
                              downloadLink.download = `nexqr-${Date.now()}.png`;
                              downloadLink.href = pngFile;
                              downloadLink.click();
                            }
                          };
                          // Handle SVG encoding properly for all browsers
                          try {
                            // Modern browsers
                            img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
                          } catch (error) {
                            // Fallback for UTF-16 characters
                            console.error('SVG encoding error:', error);
                            const encoded = encodeURIComponent(svgData)
                              .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));
                            img.src = `data:image/svg+xml;base64,${btoa(encoded)}`;
                          }
                        }
                      }}
                    >
                      Download QR Code
                    </button>
                    <p className="text-sm text-gray-500 text-center">Download as high-resolution PNG (4x quality)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">⚡</div>
                  <p>Enter your details to generate a QR code</p>
                </div>
              )}
            </div>

            <div className="bg-white/50 p-6 rounded-xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Customize Design</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">QR Code Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">{qrColor.toUpperCase()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">{bgColor.toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
};

export default QRCodeGenerator;
