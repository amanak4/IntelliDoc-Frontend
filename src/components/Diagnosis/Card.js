import { ArrowUpRight, Clock, Shield } from "lucide-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function CardThree({ key, id, img, name, description, path }) {
  const { user, setUser, isAuthorized, setIsAuthorized } = useContext(Context);

  const handleClick = () => {
    if (!isAuthorized) {
      toast.error("Please login to access diagnostic tests");
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <ArrowUpRight className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Features */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>5-10 min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Secure</span>
          </div>
        </div>

        <Link to={path} onClick={handleClick}>
          <Button
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={!isAuthorized}
          >
            {isAuthorized ? "Start Test" : "Login Required"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
