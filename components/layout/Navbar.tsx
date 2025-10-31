'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-2">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 2 L12 22 M2 12 L22 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary font-[family-name:var(--font-poppins)]">
                Free Foot Play
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/matches" className="text-gray-700 hover:text-primary transition-colors">
              Matches
            </Link>
            <Link href="/field-info" className="text-gray-700 hover:text-primary transition-colors">
              Field Info
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="text-gray-700 hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/matches" className="block py-2 text-gray-700 hover:text-primary transition-colors">
              Matches
            </Link>
            <Link href="/field-info" className="block py-2 text-gray-700 hover:text-primary transition-colors">
              Field Info
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/auth/login" className="block py-2 text-gray-700 hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="block mt-2 btn-primary text-center">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
