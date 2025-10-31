import axios from "axios";
import { useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Context } from ".";
import Blood_Test from "../src/components/Form/BloodTest.jsx";
import Cardio_disease from "../src/components/Form/Cardio_disease.jsx";
import Kidney_Stone from "../src/components/Form/Kidney_Stone.jsx";
import Liver_Disease from "../src/components/Form/Liver_Disease.jsx";
import "./App.css";
import { BASE_URL } from "./Base_url.js";
import ChangePassword from "./components/Auth/ChangePassword.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserProfile from "./components/Dashboard/Dashboard.jsx";
import Diagnosis from "./components/Diagnosis/Diagnosis";
import DiabetesForm from "./components/Form/Diabetes.jsx";
import HeartDiseaseForm from "./components/Form/Heart_disease.jsx";
import CataractForm from "./components/Form/Image-Part/Cataract.jsx";
import Ct_scan_form from "./components/Form/Image-Part/ct_scan.jsx";
import DiabeticRetinopathyForm from "./components/Form/Image-Part/Diabeticretinopathy.jsx";
import SkinDiseaseForm from "./components/Form/Image-Part/Skin_Disease.jsx";
import Home from "./components/Home/Home";
import Footer from "./components/Layouts/Footer";
import Navbar from "./components/Layouts/Navbar";
import NotFound from "./components/NotFound/NotFound";
import RecommendationPage from "./components/RecommendationPage/RecommendPage.jsx";
import BloodTestResults from "./components/Results/BloodTestResults.jsx";
import Cardio_disease_Results from "./components/Results/CardioDiseaseResults.jsx";
import DiabetesResults from "./components/Results/DiabetesResults.jsx";
import HeartDiseaseResults from "./components/Results/HeartDiseaseResult.jsx";
import CataractResult from "./components/Results/Img-result/CataractResult.jsx";
import CTScanResult from "./components/Results/Img-result/CT_scanResult.jsx";
import DiabeticRetinopathyResult from "./components/Results/Img-result/DiabeticretinopathyResult.jsx";
import SkinDiseaseResult from "./components/Results/Img-result/SkinDiseaseResult.jsx";
import KidneyStoneResults from "./components/Results/KidneyStoneResults.jsx";
import LiverDiseaseResult from "./components/Results/LiverDiseaseResult.jsx";
import ErrorBoundary from "./components/ui/error-boundary.jsx";
import { FloatingChatProvider } from "./components/ui/FloatingChatContext.jsx";
import FloatingChatWrapper from "./components/ui/FloatingChatWrapper.jsx";
function App() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const location = window.location;
  const getUser = async () => {
    try {
      if (location.pathname === "/medibuddy") {
        return;
      }
      const response = await axios.get(`${BASE_URL}/getuser`, {
        withCredentials: true,
      });
      console.log("app response", response);
      setUser(response.data.user);
      setIsAuthorized(true);
      toast.success(response.data.message);
    } catch (error) {
      // Handle different types of errors safely
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while fetching user data");
      }
      // Keep authentication as true - don't set to false
      // setIsAuthorized(false);
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, [isAuthorized]);

  console.log("auth->", isAuthorized);
  console.log("user->", user);
  return (
    <FloatingChatProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/changePassword" element={<ChangePassword />} />
                <Route path="/diagnosis" element={<Diagnosis />} />
                <Route path="/diabetes" element={<DiabetesForm />} />
                <Route path="/heart-disease" element={<HeartDiseaseForm />} />
                <Route path="/cataract" element={<CataractForm />} />
                <Route path="/cardioDisease" element={<Cardio_disease />} />
                <Route path="/liverDisease" element={<Liver_Disease />} />
                <Route path="/bloodTest" element={<Blood_Test />} />
                <Route path="/kidneyStone" element={<Kidney_Stone />} />
                <Route path="/skin-disease" element={<SkinDiseaseForm />} />
                <Route path="/ct-scan" element={<Ct_scan_form />} />
                <Route
                  path="/diabetic-retinopathy"
                  element={<DiabeticRetinopathyForm />}
                />
                <Route path="/bloodtest/:id" element={<BloodTestResults />} />
                <Route
                  path="/heart-disease-results/:id"
                  element={<HeartDiseaseResults />}
                />
                <Route
                  path="/cardio-disease-results/:id"
                  element={<Cardio_disease_Results />}
                />
                <Route
                  path="/diabetes-results/:id"
                  element={<DiabetesResults />}
                />
                <Route
                  path="/kidney-stone-results/:id"
                  element={<KidneyStoneResults />}
                />
                <Route
                  path="/liver-disease-results/:id"
                  element={<LiverDiseaseResult />}
                />
                <Route
                  path="/cataract-results/:id"
                  element={<CataractResult />}
                />
                <Route path="/ct-scan-results/:id" element={<CTScanResult />} />
                <Route
                  path="/diabetic-retinopathy-results/:id"
                  element={<DiabeticRetinopathyResult />}
                />
                <Route
                  path="/skin-disease-results/:id"
                  element={<SkinDiseaseResult />}
                />
                <Route path="/medicines" element={<RecommendationPage />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingChatWrapper />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </div>
        </Router>
      </ErrorBoundary>
    </FloatingChatProvider>
  );
}

export default App;
