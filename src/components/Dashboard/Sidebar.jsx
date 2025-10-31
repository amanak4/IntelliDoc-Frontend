import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  Pill,
  Settings,
  Stethoscope,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/user-profile",
      active: location.pathname === "/user-profile",
    },
    {
      icon: Stethoscope,
      label: "Diagnosis",
      href: "/diagnosis",
      active: location.pathname === "/diagnosis",
    },
    {
      icon: Pill,
      label: "Medicines",
      href: "/medicines",
      active: location.pathname === "/medicines",
    },
    {
      icon: FileText,
      label: "Medical History",
      href: "/history",
      active: location.pathname === "/history",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/analytics",
      active: location.pathname === "/analytics",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <span className="text-xl font-bold text-gray-900">IntelliDoc</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
