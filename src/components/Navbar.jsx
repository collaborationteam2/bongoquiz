import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  ListChecks, 
  Info, 
  Mail, 
  LogIn, 
  BrainCircuit 
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Quiz', path: '/quiz', icon: ListChecks },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const getDesktopLinkClass = ({ isActive }) => 
    `flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
      isActive 
        ? 'border-indigo-600 text-indigo-600' 
        : 'border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-300'
    }`;

  const getMobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-2 group focus:outline-none"
              onClick={closeMobileMenu}
            >
              <div className="p-2 bg-indigo-600 rounded-lg group-hover:bg-indigo-700 transition-colors">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                BongoQuiz
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={getDesktopLinkClass}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </NavLink>
              );
            })}
            
            <div className="pl-4 ml-4 border-l border-gray-200">
              <NavLink 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </NavLink>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 rounded-md hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-colors"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white sm:px-3 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={getMobileLinkClass}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
          
          <div className="pt-4 pb-2 mt-4 border-t border-gray-100">
            <NavLink
              to="/login"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <LogIn className="w-5 h-5" />
              Login to BongoQuiz
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;