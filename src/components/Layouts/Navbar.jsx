import axios from "axios";
import {
  ChevronDown,
  Home,
  LogOut,
  Menu,
  Pill,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assests/mainlogo.png";
import { BASE_URL } from "../../Base_url";
import { Context } from "../../index.js";
import { Button } from "../ui/button";

function Navbar() {
  const navigateTo = useNavigate();
  const [seeProfile, setSeeProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const location = useLocation();

  const Links = [
    { name: "Home", link: "/", icon: Home },
    { name: "Diagnosis", link: "/diagnosis", icon: Stethoscope },
    { name: "Medicines", link: "/medicines", icon: Pill },
  ];

  let username;
  if (isAuthorized && user && user.name) {
    username = user.name[0].toUpperCase();
  }

  const handleLogout = async () => {
    try {
      setMobileMenuOpen(false);
      setSeeProfile(false);
      const response = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      console.log(response.data);
      toast.success(response.data.message);
      // Keep authentication as true - don't set to false
      // setIsAuthorized(false);
      setUser(null);
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  // Don't show navbar on certain pages
  const hiddenPages = [
    "/login",
    "/signup",
    "/medibuddy",
    "/user-profile",
    "/changePassword",
    "/forgotPassword",
  ];
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} className="w-8 h-8" alt="IntelliDoc" />
            <span className="text-xl font-bold text-gray-900">IntelliDoc</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {Links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.link}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.link
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthorized ? (
              <Button
                onClick={() => navigateTo("/login")}
                className="bg-primary hover:bg-primary/90"
              >
                Get Started
              </Button>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setSeeProfile(!seeProfile)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                    {username}
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>

                {seeProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
                    <Link
                      to="/user-profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setSeeProfile(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.link}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === link.link
                        ? "text-primary bg-primary/10"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}

              <div className="border-t pt-4">
                {!isAuthorized ? (
                  <Button
                    onClick={() => {
                      navigateTo("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Get Started
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/user-profile"
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
