export default function WhyTaskManager() {
  return (
    <section className="bg-[#faf8f3] px-6 py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section intro */}
        <div className="grid md:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <p className="text-lg font-semibold tracking-wide text-[#ff6c37] mb-4">
              WHY TASKMANAGER
            </p>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-[#171513] leading-[0.95]">
              Less managing.
              <br />
              <span className="text-[#ff6c37]">More doing.</span>
            </h2>
          </div>

          <p className="text-lg text-gray-500 max-w-md md:ml-auto leading-relaxed">
            Your task list should help you move forward, not become another
            thing you have to manage.
          </p>
        </div>

        {/* Feature layout */}
        <div className="grid md:grid-cols-12 gap-5">
          {/* Feature 01 */}
          <div className="md:col-span-7 bg-[#171513] text-white rounded-3xl p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[#ff6c37] text-sm font-medium">01</span>

              <span className="text-xs tracking-[0.2em] text-white/40">
                CAPTURE
              </span>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Get it out
                <br />
                of your head.
              </h3>

              <p className="mt-4 text-white/50 max-w-md leading-relaxed">
                Add a task the moment it comes to mind. No folders, no
                complicated setup, no friction.
              </p>
            </div>
          </div>

          {/* Feature 02 */}
          <div className="md:col-span-5 bg-[#ff6c37] text-white rounded-3xl p-8 md:p-10 min-h-[320px] flex flex-col justify-between rotate-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-white/70">02</span>

              <span className="text-xs tracking-[0.2em] text-white/60">
                FOCUS
              </span>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
                See what
                <br />
                matters now.
              </h3>

              <p className="mt-4 text-white/75 leading-relaxed">
                Keep the important stuff visible and everything else out of the
                way.
              </p>
            </div>
          </div>

          {/* Feature 03 */}
          <div className="md:col-span-5 bg-[#EDE9E3] rounded-3xl p-8 md:p-10 min-h-[280px] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[#ff6c37] text-sm font-medium">03</span>

              <span className="text-xs tracking-[0.2em] text-gray-500">
                FINISH
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-semibold tracking-tight text-[#171513]">
                One check.
                <br />
                Done.
              </h3>

              <p className="mt-4 text-gray-600 leading-relaxed">
                Mark it complete and move on. Small wins add up.
              </p>
            </div>
          </div>

          {/* Feature 04 */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 md:p-10 min-h-[280px] border border-black/5 flex items-center justify-between gap-8">
            <div>
              <span className="text-[#ff6c37] text-sm font-medium">04</span>

              <h3 className="mt-8 text-3xl md:text-4xl font-semibold tracking-tight text-[#171513]">
                Your list.
                <br />
                Your rules.
              </h3>

              <p className="mt-4 text-gray-500 max-w-md leading-relaxed">
                Keep your tasks organized the way you want. Focus on what
                matters now and leave the rest for later.
              </p>
            </div>

            <div className="hidden sm:flex flex-col gap-3 w-36">
              <div className="h-2 rounded-full bg-[#171513]" />
              <div className="h-2 rounded-full bg-[#171513]/20 w-24" />
              <div className="h-2 rounded-full bg-[#ff6c37] w-28" />
              <div className="h-2 rounded-full bg-[#171513]/10 w-20" />
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-14 flex items-center gap-4">
          <span className="w-2 h-2 rounded-full bg-[#ff6c37]" />

          <p className="text-sm md:text-base text-gray-500">
            Built to stay out of your way.
          </p>
        </div>
      </div>
    </section>
  );
}
