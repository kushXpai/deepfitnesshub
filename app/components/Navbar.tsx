// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/trainers", label: "Trainers" },
    { href: "/blogs", label: "Blogs" },
    { href: "/calculators", label: "Calculators" },
  ];

  const getLinkClasses = (path: string, isMobile: boolean = false) => {
    const baseClasses = isMobile 
      ? "block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg"
      : "relative px-4 py-2 font-medium transition-all duration-300";
    
    if (isActive(path)) {
      return isMobile
        ? `${baseClasses} text-purple-600 bg-purple-50 border-l-4 border-purple-600`
        : `${baseClasses} text-purple-600 border-b-2 border-purple-600 pb-1`;
    }
    
    return isMobile
      ? `${baseClasses} text-gray-600 hover:text-purple-600 hover:bg-purple-50`
      : `${baseClasses} text-gray-600 hover:text-purple-600`;
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white border-b border-gray-200'
      }`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 max-w-6xl mx-auto">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="group">
                <div className="text-xl lg:text-2xl font-bold">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
                    Deep Fitness Hub
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-6 lg:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={getLinkClasses(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-10 h-10 flex items-center justify-center text-gray-600 hover:text-purple-600 transition-colors duration-300 rounded-lg hover:bg-purple-50"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    isMenuOpen ? 'rotate-45 translate-y-0.5' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`block h-0.5 w-6 bg-current mt-1 transition-all duration-300 ${
                    isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-2 max-w-6xl mx-auto">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={getLinkClasses(item.href, true)}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInFromLeft 0.4s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Enhanced mobile touch targets */
        @media (max-width: 768px) {
          .mobile-nav-link {
            min-height: 48px;
            display: flex;
            align-items: center;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 640px) and (max-width: 1023px) {
          nav {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        
        /* Better hover states for touch devices */
        @media (hover: hover) {
          .hover-effect:hover {
            transform: translateY(-1px);
          }
        }
      `}</style>
    </>
  );
}