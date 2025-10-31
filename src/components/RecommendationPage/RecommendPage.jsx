import { Plus, Search, Users, X } from "lucide-react";
import React, { useState } from "react";
import { useFloatingChat } from "../ui/FloatingChatContext";

const RecommendationPage = () => {
  const [symptom, setSymptom] = useState("");
  const [symptomsList, setSymptomsList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { openChat } = useFloatingChat();

  // Common symptoms for suggestions
  const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Cold",
    "Sore Throat",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Constipation",
    "Stomach Pain",
    "Back Pain",
    "Joint Pain",
    "Muscle Pain",
    "Chest Pain",
    "Shortness of Breath",
    "Dizziness",
    "Fatigue",
    "Rash",
    "Itching",
    "Swelling",
    "Heartburn",
    "Indigestion",
    "Bloating",
    "Runny Nose",
    "Sneezing",
    "Watery Eyes",
    "Loss of Appetite",
    "Weight Loss",
    "Weight Gain",
    "Insomnia",
    "Anxiety",
    "Depression",
    "Memory Loss",
    "Confusion",
    "Seizures",
    "Tremors",
    "Numbness",
    "Tingling",
    "Weakness",
    "High Blood Pressure",
    "Low Blood Pressure",
    "Diabetes",
    "High Cholesterol",
    "Allergies",
    "Asthma",
    "Bronchitis",
    "Pneumonia",
    "Sinusitis",
    "Migraine",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setSymptom(value);
    if (value) {
      const filteredSuggestions = commonSymptoms.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Show only first 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleAddSymptom = () => {
    if (symptom) {
      setSymptomsList([...symptomsList, symptom]);
      setSymptom("");
      setSuggestions([]);
    }
  };

  const handleRemoveSymptom = (index) => {
    const newSymptomsList = [...symptomsList];
    newSymptomsList.splice(index, 1);
    setSymptomsList(newSymptomsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (symptomsList.length === 0) {
      alert("Please add at least one symptom before getting recommendations.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/recommend_medicines",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms: symptomsList }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommended_medicines || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to get recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSymptom(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Medicine Recommendation
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Get personalized medicine recommendations based on your symptoms
          </p>
          {/* <button
            onClick={openChat}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition-colors duration-200 shadow-md"
          >
            <Users className="w-5 h-5 mr-3" />
            Try MediBuddy
          </button> */}
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            {/* Symptom Input */}
            <div className="relative mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={symptom}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Type symptom..."
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSymptom}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Symptom</span>
                </button>
              </div>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Added Symptoms */}
            {symptomsList.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Added Symptoms:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {symptomsList.map((symptom, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full flex items-center space-x-2"
                    >
                      <span className="text-sm font-medium">{symptom}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSymptom(index)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || symptomsList.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Getting Recommendations...</span>
                </div>
              ) : (
                "Get Recommendations"
              )}
            </button>
          </form>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recommendations:
            </h2>
            <div className="space-y-6">
              {recommendations.map((medicine, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {medicine["Medicine Name"]}
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p>
                          <span className="font-semibold">Composition:</span>{" "}
                          {medicine["Composition"]}
                        </p>
                        <p>
                          <span className="font-semibold">Uses:</span>{" "}
                          {medicine["Uses"]}
                        </p>
                        <p>
                          <span className="font-semibold">Side Effects:</span>{" "}
                          {medicine["Side_effects"]}
                        </p>
                        <p>
                          <span className="font-semibold">Manufacturer:</span>{" "}
                          {medicine["Manufacturer"]}
                        </p>
                      </div>
                    </div>
                    {medicine["Image URL"] && (
                      <div className="flex-shrink-0">
                        <img
                          src={medicine["Image URL"]}
                          alt={medicine["Medicine Name"]}
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {recommendations.length === 0 &&
          !loading &&
          symptomsList.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Recommendations Found
              </h3>
              <p className="text-gray-500">
                Try adding more specific symptoms or consult with MediBuddy for
                assistance.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default RecommendationPage;
