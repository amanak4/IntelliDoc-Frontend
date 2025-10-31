import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MLBASE_URL } from "../../Base_url";
import PredictionForm from "../ui/PredictionForm";

const HeartDiseaseForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Sex: "",
    "Chest pain type": "",
    BP: "",
    Cholesterol: "",
    "FBS over 120": "",
    "EKG results": "",
    "Max HR": "",
    "Exercise angina": "",
    "ST depression": "",
    "Slope of ST": "",
    "Number of vessels fluro": "",
    Thallium: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Define form fields configuration
  const fields = [
    {
      name: "Age",
      label: "Age",
      type: "number",
      required: true,
      min: 0,
      max: 120,
      tooltip: "Age in years",
    },
    {
      name: "Sex",
      label: "Sex",
      type: "select",
      required: true,
      options: [
        { value: "0", label: "Female" },
        { value: "1", label: "Male" },
      ],
    },
    {
      name: "Chest pain type",
      label: "Chest Pain Type",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Typical Angina" },
        { value: "2", label: "Atypical Angina" },
        { value: "3", label: "Non-anginal Pain" },
        { value: "4", label: "Asymptomatic" },
      ],
    },
    {
      name: "BP",
      label: "Blood Pressure",
      type: "number",
      required: true,
      min: 0,
      max: 300,
      tooltip: "Blood pressure (mmHg)",
    },
    {
      name: "Cholesterol",
      label: "Cholesterol",
      type: "number",
      required: true,
      min: 0,
      max: 600,
      tooltip: "Cholesterol level (mg/dL)",
    },
    {
      name: "FBS over 120",
      label: "Fasting Blood Sugar > 120",
      type: "select",
      required: true,
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
    {
      name: "EKG results",
      label: "EKG Results",
      type: "select",
      required: true,
      options: [
        { value: "0", label: "Normal" },
        { value: "1", label: "ST-T Wave Abnormality" },
        { value: "2", label: "Left Ventricular Hypertrophy" },
      ],
    },
    {
      name: "Max HR",
      label: "Max Heart Rate",
      type: "number",
      required: true,
      min: 0,
      max: 250,
      tooltip: "Maximum heart rate achieved",
    },
    {
      name: "Exercise angina",
      label: "Exercise Induced Angina",
      type: "select",
      required: true,
      options: [
        { value: "0", label: "No" },
        { value: "1", label: "Yes" },
      ],
    },
    {
      name: "ST depression",
      label: "ST Depression",
      type: "number",
      required: true,
      min: 0,
      max: 10,
      step: 0.1,
      tooltip: "ST depression induced by exercise",
    },
    {
      name: "Slope of ST",
      label: "Slope of ST Segment",
      type: "select",
      required: true,
      options: [
        { value: "1", label: "Upsloping" },
        { value: "2", label: "Flat" },
        { value: "3", label: "Downsloping" },
      ],
    },
    {
      name: "Number of vessels fluro",
      label: "Number of Major Vessels",
      type: "number",
      required: true,
      min: 0,
      max: 3,
      tooltip: "Number of major vessels colored by fluoroscopy",
    },
    {
      name: "Thallium",
      label: "Thallium Scan",
      type: "select",
      required: true,
      options: [
        { value: "3", label: "Normal" },
        { value: "6", label: "Fixed Defect" },
        { value: "7", label: "Reversible Defect" },
      ],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const munnadata = [
    {
      Age: parseInt(formData.Age),
      Sex: parseInt(formData.Sex),
      "Chest pain type": parseInt(formData["Chest pain type"]),
      BP: parseInt(formData.BP),
      Cholesterol: parseInt(formData.Cholesterol),
      "FBS over 120": parseInt(formData["FBS over 120"]),
      "EKG results": parseInt(formData["EKG results"]),
      "Max HR": parseInt(formData["Max HR"]),
      "Exercise angina": parseInt(formData["Exercise angina"]),
      "ST depression": parseInt(formData["ST depression"]),
      "Slope of ST": parseInt(formData["Slope of ST"]),
      "Number of vessels fluro": parseInt(formData["Number of vessels fluro"]),
      Thallium: parseInt(formData.Thallium),
    },
  ];

  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${MLBASE_URL}/predict1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(munnadata),
      });
      setLoading(false);
      // const data = await response.json();
      // const prediction = data.prediction[0];
      console.log("prediction", response);
      navigateTo(`/heart-disease-results`);
      // setResponseMessage(prediction);
      // toast.success(prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <PredictionForm
      title="Heart Disease Prediction"
      formData={formData}
      onInputChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      fields={fields}
      submitButtonText="Predict"
    />
  );
};

export default HeartDiseaseForm;
