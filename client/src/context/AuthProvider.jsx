import AuthContext from "./AuthContext.jsx";
import { useState } from "react";
import api from "../services/api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }) {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerController = async (registerData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/register", registerData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success(data?.message);
      navigate("/dashboard");
      return data;
    } catch (error) {
      console.log("Error in register controller: ", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const loginController = async (loginData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/api/login", loginData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success(data?.message);
      navigate("/dashboard");
      return data;
    } catch (error) {
      console.log("Error occurred in login controller:", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const logoutController = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("Logout sucessful.");
      navigate("/");
    } catch (error) {
      console.log("Error in logout controller: ", error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    loginController,
    registerController,
    logoutController,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
