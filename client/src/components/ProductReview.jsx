import { useState } from "react";

export default function ProductPreview() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Pay electricity bill", completed: true },
    { id: 2, text: "Book a hotel for the trip", completed: true },
    { id: 3, text: "Order a new laptop charger", completed: false },
    { id: 4, text: "Schedule a meeting for Friday", completed: false },
  ]);

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const todaysDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const completedCount = tasks.filter((task) => task.completed == true).length;

  const progressPercent =
    tasks.length !== 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <section className="bg-[#faf8f3] px-6 py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <p className="text-lg font-semibold tracking-wide text-[#ff6c37] mb-4">
              YOUR WORKSPACE
            </p>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#171513] leading-[0.9]">
              See the work.
              <br />
              <span className="text-[#ff6c37]">Do the work.</span>
            </h2>
          </div>

          <p className="text-gray-500 text-lg max-w-sm leading-relaxed md:pb-1">
            Everything important in one place. Nothing fighting for your
            attention.
          </p>
        </div>

        {/* Product window */}
        <div className="relative">
          {/* Main app */}
          <div className="bg-white border border-[#171513]/10 rounded-[2rem] shadow-[0_25px_80px_rgba(23,21,19,0.10)] overflow-hidden">
            {/* Window header */}
            <div className="h-14 border-b border-gray-100 flex items-center px-6 justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#171513]" />
                <span className="text-sm font-semibold text-[#171513]">
                  TaskManager
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-6 text-xs text-gray-400">
                <span className="text-[#171513] font-medium">Today</span>
                <span>Completed</span>
              </div>
            </div>

            {/* App content */}
            <div className="grid md:grid-cols-[220px_1fr] min-h-[460px]">
              {/* Sidebar */}
              <aside className="hidden md:flex flex-col border-r border-gray-100 p-6">
                <div className="text-xs font-medium text-gray-400 mb-4">
                  WORKSPACE
                </div>

                <div className="flex items-center justify-between text-sm font-medium text-[#171513] bg-[#faf8f3] rounded-xl px-3 py-2.5">
                  <span>Today</span>
                  <span className="text-xs text-gray-400">{tasks.length}</span>
                </div>

                <div className="text-sm text-gray-500 px-3 py-2.5">
                  All tasks
                </div>

                <div className="text-sm text-gray-500 px-3 py-2.5">
                  Completed
                </div>

                <div className="mt-auto text-xs text-gray-400">
                  Keep it simple.
                </div>
              </aside>

              {/* Tasks */}
              <main className="p-7 md:p-10">
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">{todaysDate}</p>

                    <h3 className="text-3xl font-bold text-[#171513]">Today</h3>
                  </div>

                  <span className="text-sm text-gray-400">
                    {completedCount} / {tasks.length} done
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggle(task.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl  cursor-pointer ${
                        task.completed
                          ? "bg-[#faf8f3]"
                          : "border border-gray-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs ${
                          task.completed
                            ? "bg-[#ff6c37]"
                            : "border-2 border-gray-300"
                        }`}
                      >
                        {task.completed && "✓"}
                      </div>

                      <span
                        className={
                          task.completed
                            ? "text-gray-400 line-through"
                            : "text-[#171513]"
                        }
                      >
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add task */}
                <div className="mt-8 flex items-center gap-3 text-[#ff6c37] text-sm font-medium">
                  <span className="text-lg">+</span>
                  Add a task
                </div>
              </main>
            </div>
          </div>

          {/* Floating progress note */}
          <div className="absolute -bottom-7 right-6 md:right-12 bg-[#171513] text-white rounded-2xl px-5 py-4 shadow-xl">
            <p className="text-xs text-white/40 mb-1">TODAY'S PROGRESS</p>

            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">{progressPercent}%</span>
              <span className="text-xs text-[#ff6c37] mb-1">keep going</span>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-20 flex items-center justify-between">
          <p className="text-sm text-gray-400">Simple by design.</p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6c37]" />
            <span className="text-sm font-medium text-[#171513]">
              Built for getting things done.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
