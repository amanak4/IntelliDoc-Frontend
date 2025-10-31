import {
  ArrowRight,
  Brain,
  Eye,
  Heart,
  Pill,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useFloatingChat } from "../ui/FloatingChatContext";

function Home() {
  const { openChat } = useFloatingChat();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description:
        "Advanced machine learning algorithms provide accurate medical diagnoses based on symptoms and test results.",
    },
    {
      icon: Heart,
      title: "Cardiovascular Health",
      description:
        "Comprehensive heart disease prediction and monitoring with detailed risk assessment.",
    },
    {
      icon: Eye,
      title: "Eye Health Detection",
      description:
        "Early detection of cataracts and diabetic retinopathy through advanced image analysis.",
    },
    {
      icon: Pill,
      title: "Medicine Recommendation",
      description:
        "Personalized medicine suggestions based on your medical history and current conditions.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your health data is encrypted and protected with industry-leading security measures.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Get immediate insights and recommendations without waiting for appointments.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your Data",
      description:
        "Provide your symptoms, test results, or medical images through our secure platform.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms analyze your data using cutting-edge medical models.",
    },
    {
      number: "03",
      title: "Get Results",
      description:
        "Receive detailed diagnosis, recommendations, and personalized treatment options.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Intelligent Healthcare
              <span className="text-primary block">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of healthcare with AI-powered diagnosis,
              personalized medicine recommendations, and comprehensive health
              insights - all at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              >
                <Link to="/diagnosis" className="flex items-center">
                  Start Diagnosis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
                onClick={openChat}
              >
                <div className="flex items-center">
                  Try MediBuddy
                  <Users className="ml-2 w-5 h-5" />
                </div>
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose IntelliDoc?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with medical
              expertise to provide you with the best healthcare experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with IntelliDoc in just three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Healthcare?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust IntelliDoc for their healthcare
            needs. Get started today and experience the future of medical
            diagnosis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/signup" className="flex items-center">
                Create Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link to="/login" className="flex items-center">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Available Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Diseases Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
