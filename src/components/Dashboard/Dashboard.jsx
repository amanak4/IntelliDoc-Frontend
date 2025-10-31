import axios from "axios";
import {
  Camera,
  CheckCircle,
  Mail,
  MessageSquare,
  Send,
  Upload,
  User,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import profilePic from "../../assests/defaultProfile.png";
import { BASE_URL } from "../../Base_url";
import { Context } from "../../index.js";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Sidebar from "./Sidebar.jsx";

const UserProfile = () => {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchImageUrl();
  }, []);

  const fetchImageUrl = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user-profile`, {
        withCredentials: true,
      });
      if (response.data.image_url) {
        setImgUrl(response.data.image_url);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    setLoading1(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${BASE_URL}/handleFileUpload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading1(false);
      setImgUrl(response.data.imageUrl);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setLoading1(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      toast.error("Please enter your feedback");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASE_URL}/submit`,
        { feedback },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      setLoading(false);
      setFeedback("");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Manage your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Profile Picture */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={imgUrl || profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label
                      htmlFor="imageInput"
                      className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 cursor-pointer transition-colors shadow-lg"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        id="imageInput"
                        className="hidden"
                        onChange={(e) => {
                          setSelectedFile(e.target.files[0]);
                          uploadImage();
                        }}
                      />
                    </label>
                    {loading1 && (
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {user?.name || "User"}
                    </h2>
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email || "No email"}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Account Verified
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Welcome Message */}
            <Card>
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to your profile page!
                  </h3>
                  <p className="text-gray-600">
                    Here, you can view your personal information, manage your
                    profile settings, and provide valuable feedback to help us
                    improve IntelliDoc.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Share Your Feedback</span>
                </CardTitle>
                <CardDescription>
                  Help us improve IntelliDoc by sharing your thoughts and
                  suggestions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your experience with IntelliDoc..."
                  />
                </div>
                <Button
                  onClick={handleFeedbackSubmit}
                  disabled={loading || !feedback.trim()}
                  className="w-full"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Submit Feedback</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Access your most used features quickly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <Upload className="w-6 h-6" />
                    <span>Upload Test Results</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <MessageSquare className="w-6 h-6" />
                    <span>Chat with MediBuddy</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                  >
                    <User className="w-6 h-6" />
                    <span>View Medical History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
