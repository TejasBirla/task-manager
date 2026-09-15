export default function StayOnTop() {
  return (
    <section
      className="bg-[#171513] text-white px-6 py-18 scroll-mt-5"
      id="how-it-works"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-[#ff6c37] mb-3">
            LESS CHAOS. MORE DONE.
          </p>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>

          <p className="mt-5 text-gray-400 text-lg max-w-xl leading-relaxed">
            Add the things that matter, keep an eye on what’s left, and get on
            with your day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-[#211f1c] border border-white/10 rounded-2xl p-7">
            <span className="text-[#ff6c37] text-3xl font-light">01</span>

            <h3 className="text-xl font-semibold mt-10">Put it down.</h3>

            <p className="mt-3 text-gray-400 leading-relaxed">
              That thing you keep telling yourself you'll remember? Add it
              before you forget it again.
            </p>
          </div>

          <div className="bg-[#ff6c37] text-white rounded-2xl p-7 md:-translate-y-5">
            <span className="text-white/70 text-3xl font-light">02</span>

            <h3 className="text-xl font-semibold mt-10">Keep moving.</h3>

            <p className="mt-3 text-white/80 leading-relaxed">
              See what's waiting, check things off, and keep the momentum going.
            </p>
          </div>

          <div className="bg-[#211f1c] border border-white/10 rounded-2xl p-7">
            <span className="text-[#ff6c37] text-3xl font-light">03</span>

            <h3 className="text-xl font-semibold mt-10">Call it done.</h3>

            <p className="mt-3 text-gray-400 leading-relaxed">
              One less thing on your list. One more thing out of your head.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
