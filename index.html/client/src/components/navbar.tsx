import { useState } from "react";
import { Link } from "wouter";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-black/60 backdrop-blur-xl border-b border-[#38BDF8]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-[#38BDF8] to-[#0CD7E4] bg-clip-text text-transparent text-2xl font-semibold">
                CrispiClean | CodNova
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#technology" className="text-gray-300 hover:text-[#38BDF8] transition-colors">Technology</a>
              <a href="#calculator" className="text-gray-300 hover:text-[#38BDF8] transition-colors">Calculator</a>
              <a href="#analysis" className="text-gray-300 hover:text-[#38BDF8] transition-colors">AI Analysis</a>
            </div>
            <div className="md:hidden">
              <button 
                type="button" 
                className="text-gray-300 hover:text-[#38BDF8]"
                onClick={toggleMobileMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="backdrop-blur-xl bg-black/80 px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-[#38BDF8]/30">
          <a href="#technology" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#38BDF8]/20">Technology</a>
          <a href="#calculator" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#38BDF8]/20">Calculator</a>
          <a href="#analysis" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#38BDF8]/20">AI Analysis</a>
        </div>
      </div>
    </>
  );
}
