import {
  Brain,
  Clock,
  Eye,
  Heart,
  Pill,
  Search,
  Shield,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useFloatingChat } from "../ui/FloatingChatContext";
import { Input } from "../ui/input";
import CardList from "./CardList.js";
import { tests } from "./Tests.js";

function Diagnosis() {
  const [searchfield, setSearchfield] = useState("");
  const { openChat } = useFloatingChat();

  const onSearchChange = (e) => {
    setSearchfield(e.target.value);
  };

  const filterRobots = tests.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  });

  const categories = [
    { name: "All", count: tests.length, icon: Stethoscope },
    {
      name: "Cardiovascular",
      count: tests.filter((t) => t.category === "cardiovascular").length,
      icon: Heart,
    },
    {
      name: "Neurological",
      count: tests.filter((t) => t.category === "neurological").length,
      icon: Brain,
    },
    {
      name: "Ophthalmology",
      count: tests.filter((t) => t.category === "ophthalmology").length,
      icon: Eye,
    },
    {
      name: "General",
      count: tests.filter((t) => t.category === "general").length,
      icon: Pill,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            AI-Powered
            <span className="text-primary block">Medical Diagnosis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get accurate medical diagnoses using advanced AI technology. Choose
            from our comprehensive range of diagnostic tests and get instant
            results.
          </p>

          {/* Try MediBuddy Button */}
          {/* <div className="mb-8">
            <Button
              variant="outline"
              size="lg"
              onClick={openChat}
              className="inline-flex items-center px-6 py-3"
            >
              <Users className="w-5 h-5 mr-2" />
              Try MediBuddy
            </Button>
          </div> */}

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for diagnostic tests..."
                value={searchfield}
                onChange={onSearchChange}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Tests Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">AI</div>
                  <div className="text-sm text-gray-600">Powered</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.count} tests
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Tests */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Tests{" "}
              {searchfield && `(${filterRobots.length} results)`}
            </h2>
            {searchfield && (
              <Button variant="outline" onClick={() => setSearchfield("")}>
                Clear Search
              </Button>
            )}
          </div>

          {filterRobots.length > 0 ? (
            <CardList tests={filterRobots} />
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tests found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or browse all available tests.
                </p>
                <Button onClick={() => setSearchfield("")}>
                  View All Tests
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Section */}
        {/* <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Our AI-powered MediBuddy can help you choose the right diagnostic
              test based on your symptoms and medical history.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/medibuddy">Chat with MediBuddy</Link>
            </Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}

export default Diagnosis;
