import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm">123 Abdulla ART Street, Kanpur, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">+91 (740) 809-7278</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <span className="text-sm">info@abdullaislamicstore.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/category')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cart')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Cart
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  My Account
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shipping-info')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Shipping Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/returns')}
                  className="hover:text-amber-400 transition-colors text-sm"
                >
                  Returns & Exchanges
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-amber-400 hover:text-gray-900 rounded-full transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to get special offers, free giveaways, and new product alerts.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 xs:pt-6 sm:pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/privacy-policy')}
              className="text-gray-400 hover:text-amber-400 transition-colors text-[10px] xs:text-xs sm:text-sm"
            >
              Privacy Policy
            </button>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <button
              onClick={() => navigate('/terms-of-service')}
              className="text-gray-400 hover:text-amber-400 transition-colors text-[10px] xs:text-xs sm:text-sm"
            >
              Terms of Service
            </button>
          </div>
          <p className="text-gray-400 text-[10px] xs:text-xs sm:text-sm">
            © {currentYear} Abdulla Islamic Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}