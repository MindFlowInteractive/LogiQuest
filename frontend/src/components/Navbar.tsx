import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

interface NavItem {
  label: string;
  to: string;
}

const navItems: NavItem[] = [
  { label: 'Home', to: 'hero' },
  { label: 'Why Play', to: 'why-play' },
  { label: 'About Us', to: 'about' },
  { label: 'FAQs', to: 'faqs' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <nav className="bg-[#033330] fixed top-0 left-0 z-50 w-full">
      <div className="w-full px-4 md:px-20 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <RouterLink to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="LogiQuest"
              className="w-10 h-10 mr-2"
            />
            <span className="text-[#CFFDED] text-xl font-bold">LogiQuest</span>
          </RouterLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              isHomePage ? (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-white hover:text-[#CFFDED] text-base font-medium transition-colors cursor-pointer"
                  activeClass="text-[#CFFDED]"
                >
                  {item.label}
                </ScrollLink>
              ) : (
                <RouterLink
                  key={item.to}
                  to={`/#${item.to}`}
                  className="text-white hover:text-[#CFFDED] text-base font-medium transition-colors"
                >
                  {item.label}
                </RouterLink>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                isHomePage ? (
                  <ScrollLink
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="block px-3 py-2 text-white hover:text-[#CFFDED] transition-colors cursor-pointer"
                    activeClass="text-[#CFFDED]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </ScrollLink>
                ) : (
                  <RouterLink
                    key={item.to}
                    to={`/#${item.to}`}
                    className="block px-3 py-2 text-white hover:text-[#CFFDED] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </RouterLink>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
