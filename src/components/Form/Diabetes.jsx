import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MLBASE_URL } from "../../Base_url";
import PredictionForm from "../ui/PredictionForm";
const Form = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  // Define form fields configuration
  const fields = [
    {
      name: "Pregnancies",
      label: "Pregnancies",
      type: "number",
      required: true,
      min: 0,
      max: 20,
      tooltip: "Number of pregnancies",
    },
    {
      name: "Glucose",
      label: "Glucose",
      type: "number",
      required: true,
      min: 0,
      max: 300,
      tooltip: "Glucose level (mg/dL)",
    },
    {
      name: "BloodPressure",
      label: "Blood Pressure",
      type: "number",
      required: true,
      min: 0,
      max: 200,
      tooltip: "Blood pressure (mmHg)",
    },
    {
      name: "SkinThickness",
      label: "Skin Thickness",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      tooltip: "Skin thickness (mm)",
    },
    {
      name: "Insulin",
      label: "Insulin",
      type: "number",
      required: true,
      min: 0,
      max: 1000,
      tooltip: "Insulin level (mu U/ml)",
    },
    {
      name: "BMI",
      label: "BMI",
      type: "number",
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: "Body Mass Index",
    },
    {
      name: "DiabetesPedigreeFunction",
      label: "Diabetes Pedigree Function",
      type: "number",
      required: true,
      min: 0,
      max: 3,
      step: 0.001,
      tooltip: "Diabetes pedigree function",
    },
    {
      name: "Age",
      label: "Age",
      type: "number",
      required: true,
      min: 0,
      max: 120,
      tooltip: "Age in years",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const munnadata = [
    {
      Pregnancies: parseInt(formData.Pregnancies),
      Glucose: parseInt(formData.Glucose),
      BloodPressure: parseInt(formData.BloodPressure),
      SkinThickness: parseInt(formData.SkinThickness),
      Insulin: parseInt(formData.Insulin),
      BMI: parseFloat(formData.BMI),
      DiabetesPedigreeFunction: parseFloat(formData.DiabetesPedigreeFunction),
      Age: parseInt(formData.Age),
    },
  ];
  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${MLBASE_URL}/predict2`, munnadata, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setLoading(false);
      navigateTo(`/diabetes-results/${response.data.prediction[0]}`);
      setPrediction(response.data.prediction);
      toast.success(response.data.prediction);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <PredictionForm
      title="Diabetes Prediction"
      formData={formData}
      onInputChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
      fields={fields}
      submitButtonText="Predict"
    />
  );
};

export default Form;
