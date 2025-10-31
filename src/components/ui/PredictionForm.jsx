import { AlertCircle, CheckCircle, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const PredictionForm = ({
  title,
  formData,
  onInputChange,
  onSubmit,
  loading = false,
  fields = [],
  submitButtonText = "Predict",
  className = "",
}) => {
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateField = (field, value) => {
    if (field.required && (!value || value === "")) {
      return `${field.label} is required`;
    }
    if (field.type === "number" && value) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return `${field.label} must be a valid number`;
      if (field.min !== undefined && numValue < field.min) {
        return `${field.label} must be at least ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `${field.label} must be at most ${field.max}`;
      }
    }
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(e);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    // Validate all fields
    fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      onSubmit(e);
    }
  };

  // Group fields by category for better organization
  const groupedFields = {
    "Personal Information": fields.filter((field) =>
      ["Age", "Sex"].includes(field.name)
    ),
    "Medical History": fields.filter((field) =>
      ["Chest pain type", "BP", "Cholesterol", "FBS over 120"].includes(
        field.name
      )
    ),
    "Test Results": fields.filter((field) =>
      ["EKG results", "Max HR", "Exercise angina", "ST depression"].includes(
        field.name
      )
    ),
    "Advanced Tests": fields.filter((field) =>
      ["Slope of ST", "Number of vessels fluro", "Thallium"].includes(
        field.name
      )
    ),
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Please provide accurate medical information for the best prediction
            results
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Form Sections */}
            {Object.entries(groupedFields).map(
              ([sectionTitle, sectionFields]) =>
                sectionFields.length > 0 && (
                  <div key={sectionTitle} className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b-2 border-blue-200">
                      {sectionTitle}
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sectionFields.map((field) => (
                        <div key={field.name} className="space-y-2">
                          <label
                            htmlFor={field.name}
                            className="block text-sm font-semibold text-gray-700 uppercase tracking-wide"
                          >
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>

                          {field.type === "select" ? (
                            <div className="relative">
                              <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer ${
                                  errors[field.name]
                                    ? "border-red-300 bg-red-50"
                                    : formData[field.name]
                                    ? "border-green-300 bg-green-50"
                                    : "border-gray-300 bg-white hover:border-gray-400"
                                }`}
                                required={field.required}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options?.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                              {formData[field.name] && !errors[field.name] && (
                                <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                            </div>
                          ) : (
                            <div className="relative">
                              <input
                                id={field.name}
                                name={field.name}
                                type={field.type || "text"}
                                value={formData[field.name] || ""}
                                onChange={handleInputChange}
                                placeholder={
                                  field.placeholder ||
                                  `Enter ${field.label.toLowerCase()}`
                                }
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                                  errors[field.name]
                                    ? "border-red-300 bg-red-50"
                                    : formData[field.name]
                                    ? "border-green-300 bg-green-50"
                                    : "border-gray-300 bg-white hover:border-gray-400"
                                }`}
                                required={field.required}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                              />
                              {formData[field.name] && !errors[field.name] && (
                                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                              )}
                              {field.tooltip && (
                                <div className="absolute -bottom-6 left-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {field.tooltip}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Error Message */}
                          {errors[field.name] && (
                            <div className="flex items-center text-red-600 text-sm mt-1">
                              <AlertCircle className="w-4 h-4 mr-1" />
                              {errors[field.name]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-200 min-w-[160px] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>{submitButtonText}</span>
                    <CheckCircle className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
