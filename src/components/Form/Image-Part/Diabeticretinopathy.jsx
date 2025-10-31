import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MLBASE_URL } from "../../../Base_url";
import FileUpload from "../../ui/FileUpload";
const DiabeticRetinopathyForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleFileChange = (file) => {
    setSelectedFile(file);
  };
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${MLBASE_URL}/predict_diabetic_retinopathy`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setResponseMessage(response.data.prediction);
      navigateTo(`/diabetic-retinopathy-results/${response.data.prediction}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <FileUpload
      title="Diabetic Retinopathy Prediction"
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      loading={loading}
      selectedFile={selectedFile}
      accept="image/*"
      submitButtonText="Predict"
      showPreview={true}
    />
  );
};

export default DiabeticRetinopathyForm;
