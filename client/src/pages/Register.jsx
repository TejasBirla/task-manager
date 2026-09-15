import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Register() {
  const { registerController, loading } = useContext(AuthContext);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setRegisterData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerController(registerData);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-3 h-3 rounded-full bg-[#ff6c37]" />

          <h1 className="text-2xl font-bold tracking-tight text-[#171513]">
            TaskManager
          </h1>
        </div>

        {/* Signup card */}
        <div className="bg-white border border-black/5 rounded-3xl p-8 md:p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm font-medium text-[#ff6c37] mb-2">
              GET STARTED
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#171513]">
              Create your account.
            </h2>

            <p className="mt-3 text-gray-500">
              Start keeping your work in one place.
            </p>
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
                placeholder="Choose a username"
                value={registerData.username}
                onChange={handleChange}
                className="input w-full bg-[#faf8f3] border-gray-200 focus:border-[#ff6c37] focus:outline-none"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium text-[#171513]">
                  Email
                </span>
              </label>

              <input
                type="text"
                name="email"
                value={registerData.email}
                onChange={handleChange}
                placeholder="you@example.com"
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
                value={registerData.password}
                onChange={handleChange}
                placeholder="Create a password"
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="mt-7 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to={"/login"}>
                <button className="font-medium text-[#ff6c37] hover:text-[#e85d2a]">
                  Log in
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
