import { Heart, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">IntelliDoc</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your intelligent healthcare companion powered by AI. Get accurate
              medical diagnoses, personalized medicine recommendations, and
              comprehensive health insights.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@intellidoc.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/diagnosis"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Diagnosis
                </Link>
              </li>
              <li>
                <Link
                  to="/medicines"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Medicines
                </Link>
              </li>
              <li>
                <Link
                  to="/medibuddy"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  MediBuddy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>123 Health St, Medical City, MC 12345</span>
              </div>
              <div className="text-gray-300">
                <p>24/7 Support Available</p>
                <p>Emergency: +1 (555) 911-HELP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} IntelliDoc. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-gray-300 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for better healthcare</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
