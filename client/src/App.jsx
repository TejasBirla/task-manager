import { Routes, Route } from "react-router-dom";

import ProductPreview from "./components/ProductReview";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import StayOnTop from "./components/StayOnTop";
import WhyTaskManager from "./components/WhyChooseUs";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StayOnTop />
      <WhyTaskManager />

      {/* Workspace transition */}
      <div className="bg-[#faf8f3] px-6 py-10">
        <div className="max-w-6xl mx-auto flex items-center gap-5">
          <div className="flex-1 h-px bg-[#171513]/10" />

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#ff6c37]" />

            <span className="text-[14px] font-semibold tracking-[0.3em] text-[#171513]/40 uppercase">
              Inside TaskManager
            </span>
          </div>

          <div className="flex-1 h-px bg-[#171513]/10" />
        </div>
      </div>

      <ProductPreview />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
