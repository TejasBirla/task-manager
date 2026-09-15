import { FaGithub, FaXTwitter, FaEnvelope, FaGlobe } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#171513] text-white px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Main footer */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#ff6c37]" />

              <h2 className="text-3xl font-bold tracking-tight">TaskManager</h2>
            </div>

            <p className="mt-5 text-white/40 max-w-sm leading-relaxed">
              A simple place for the things you need to get done.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/TejasBirla"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="mailto:tejasbirla3@gmail.com"
              aria-label="Email"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
            >
              <FaEnvelope size={22} />
            </a>

            <a
              href="https://x.com/TejasBytes"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
            >
              <FaXTwitter size={22} />
            </a>

            <a
              href="https://tejasbirla-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Portfolio"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-200"
            >
              <FaGlobe size={22} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-white/30">© 2026 TaskManager</p>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6c37]" />

            <p className="text-xs text-white/30">
              Built to stay out of your way.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
