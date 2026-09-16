import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white border-b border-black/10 px-4 sm:px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a className="flex items-center gap-2 sm:gap-3 cursor-pointer">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff6c37]" />

          <span className="text-lg sm:text-xl font-bold tracking-tight text-[#171513]">
            TaskManager
          </span>
        </a>

        {token ? (
          <Link to={"/dashboard"}>
            <button className="btn h-9 sm:h-10 min-h-9 sm:min-h-10 rounded-lg bg-[#ff6c37] hover:bg-[#e85d2a] text-white border-none px-3 sm:px-5 text-sm sm:text-base">
              My Dashboard
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to={"/login"}>
              <button className="text-sm font-medium text-[#171513]/60 hover:text-[#171513] transition-colors px-2 sm:px-3 py-2">
                Login
              </button>
            </Link>

            <Link to={"/register"}>
              <button className="btn h-9 sm:h-10 min-h-9 sm:min-h-10 rounded-lg bg-[#ff6c37] hover:bg-[#e85d2a] text-white border-none px-3 sm:px-5 text-sm sm:text-base">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
