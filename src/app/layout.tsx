'use client';

import { useState } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { MenuIcon, BellIcon, SearchIcon } from '@/components/icons';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="es-AR">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-gray-50">
          {/* Mobile sidebar backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-dark-900/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="lg:ml-64">
            {/* Top bar */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between h-16 px-4 lg:px-8">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="lg:hidden p-2 text-dark-600 hover:bg-gray-100 rounded-lg"
                  >
                    <MenuIcon className="w-6 h-6" />
                  </button>
                  <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                    <SearchIcon className="w-5 h-5 text-dark-400" />
                    <input
                      type="text"
                      placeholder="Buscar patente, sesión..."
                      className="bg-transparent border-none outline-none text-sm w-64"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="relative p-2 text-dark-600 hover:bg-gray-100 rounded-lg">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">O</span>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-dark-900">Operador</p>
                      <p className="text-xs text-dark-500">Sistema Parking</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Page content */}
            <main className="p-4 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
