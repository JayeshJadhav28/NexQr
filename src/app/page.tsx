'use client';

import dynamic from 'next/dynamic';

const QRCodeGenerator = dynamic(() => import('@/components/QRCodeGenerator'));

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <QRCodeGenerator />
    </div>
  );
}
