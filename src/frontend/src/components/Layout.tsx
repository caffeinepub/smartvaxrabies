import { Outlet, Link, useNavigate } from '@tanstack/react-router';
import { Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Stray Dogs', path: '/stray-dogs/gallery' },
    { name: 'Shop', path: '/shop' },
    { name: 'Events', path: '/events' },
    { name: 'Community', path: '/community' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-emerald-200 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="SmartVaxRabies Logo"
                className="h-10 w-10 rounded-full ring-2 ring-emerald-500 group-hover:ring-emerald-600 transition-all"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
                SmartVaxRabies
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  activeProps={{
                    className: 'bg-emerald-100 text-emerald-700',
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-emerald-50"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-emerald-200">
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                    activeProps={{
                      className: 'bg-emerald-100 text-emerald-700',
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-green-900 text-white mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold mb-3">SmartVaxRabies</h3>
              <p className="text-emerald-100 text-sm">
                Kerala's trusted platform for pet vaccination, stray dog welfare, and community support.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-emerald-100 hover:text-white text-sm transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <p className="text-emerald-100 text-sm">
                Kerala Vaccination Centre Network
                <br />
                Serving communities across Kerala
              </p>
            </div>
          </div>

          <div className="border-t border-emerald-700 mt-8 pt-6 text-center text-sm text-emerald-100">
            <p className="flex items-center justify-center gap-2">
              © {new Date().getFullYear()} SmartVaxRabies. Built with{' '}
              <Heart className="h-4 w-4 text-red-400 fill-red-400" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'smartvaxrabies'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
