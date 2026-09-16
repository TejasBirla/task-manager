import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
  const { loginController, loading } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setLoginData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginController(loginData);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4 sm:px-6 py-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          <span className="w-3 h-3 rounded-full bg-[#ff6c37]" />

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171513]">
            TaskManager
          </h1>
        </div>

        {/* Login card */}
        <div className="bg-white border border-black/5 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="mb-6 sm:mb-8">
            <p className="text-sm font-medium text-[#ff6c37] mb-2">
              WELCOME BACK
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171513]">
              Log in to your account.
            </h2>

            <p className="mt-3 text-gray-500">Pick up where you left off.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="label">
                <span className="label-text font-medium text-[#171513]">
                  Username
                </span>
              </label>

              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="input w-full bg-[#faf8f3] border-gray-200 focus:border-[#ff6c37] focus:outline-none"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium text-[#171513]">
                  Password
                </span>
              </label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="input w-full bg-[#faf8f3] border-gray-200 focus:border-[#ff6c37] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full h-12 min-h-12 rounded-xl bg-[#ff6c37] hover:bg-[#e85d2a] text-white border-none"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Logging in...
                </>
              ) : (
                "Login "
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to={"/register"}>
                <button className="font-medium text-[#ff6c37] hover:text-[#e85d2a]">
                  Sign up
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
