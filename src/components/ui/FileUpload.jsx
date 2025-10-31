import { AlertCircle, CheckCircle, FileImage, Upload, X } from "lucide-react";
import React, { useState } from "react";

const FileUpload = ({
  title,
  onFileChange,
  onSubmit,
  loading = false,
  selectedFile = null,
  accept = "image/*",
  submitButtonText = "Predict",
  className = "",
  showPreview = true,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (file) => {
    if (file) {
      // Validate file type
      if (accept === "image/*" && !file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setError("");
      onFileChange(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    onFileChange(null);
    setError("");
    // Reset the file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file before submitting");
      return;
    }
    onSubmit(e);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 mb-6">
            Upload your medical image for AI-powered analysis and prediction
          </p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* File Upload Section */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Upload Your Image
                </h2>
                <p className="text-gray-600">
                  Supported formats: PNG, JPG, JPEG (Max 10MB)
                </p>
              </div>

              {/* Drag & Drop Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : selectedFile
                    ? "border-green-300 bg-green-50"
                    : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept={accept}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-64 cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    {selectedFile ? (
                      <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
                    ) : (
                      <Upload className="w-16 h-16 mb-4 text-gray-400" />
                    )}
                    <p className="mb-2 text-lg font-semibold text-gray-700">
                      {selectedFile
                        ? "File Selected Successfully!"
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      {accept === "image/*"
                        ? "PNG, JPG, JPEG files only"
                        : "Any file type"}
                    </p>
                    {!selectedFile && (
                      <div className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                        Choose File
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center justify-center text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {/* Selected File Display */}
              {selectedFile && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <FileImage className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-lg font-semibold text-green-900">
                          {selectedFile.name}
                        </p>
                        <p className="text-sm text-green-600">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Image Preview */}
                  {showPreview && selectedFile.type.startsWith("image/") && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Preview:
                      </h3>
                      <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          className="w-full h-80 object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading || !selectedFile}
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

export default FileUpload;
