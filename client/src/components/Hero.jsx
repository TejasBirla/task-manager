import { useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review pull requests", completed: true },
    { id: 2, text: "Prepare tomorrow’s schedule", completed: true },
    { id: 3, text: "Update project documentation", completed: false },
    { id: 4, text: "Send the weekly report", completed: false },
  ]);

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section className="relative bg-[#faf8f3] px-6 pt-16 pb-26 md:pt-20 md:pb-28 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        {/* Left side */}
        <div>
          <p className="text-sm font-medium text-[#ff6c37] mb-4">
            GET THINGS DONE.
          </p>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black leading-tight">
            Your tasks.
            <br />
            <span className="text-[#ff6c37]">Your way.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed">
            A simple task manager for keeping track of what actually needs to
            get done. No clutter. Just your work.
          </p>

          <div className="mt-8 flex gap-4">
            <Link to={"/register"}>
              <button className="btn bg-[#ff6c37] hover:bg-[#e85d2a] text-white border-none px-6">
                Get Started
              </button>
            </Link>

            <button className="btn btn-ghost text-black">
              <a href="#how-it-works">See how it works →</a>
            </button>
          </div>
        </div>

        {/* Task preview */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-sm rotate-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Today</p>
                <h2 className="text-xl font-bold text-black">My Tasks</h2>
              </div>

              <span className="text-sm text-gray-500">
                {completedCount} / {tasks.length} done
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleToggle(task.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-left"
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    onClick={(event) => event.stopPropagation()}
                  />

                  <span
                    className={
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-black"
                    }
                  >
                    {task.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-500">Keep moving.</span>

              <span className="text-[#ff6c37] font-medium text-sm">
                + Add task
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal editorial transition */}
      <div className="mt-20 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff6c37]" />

          <span className="text-[11px] md:text-xs font-medium tracking-[0.28em] text-[#171513]">
            MAKE SPACE FOR WHAT MATTERS
          </span>
        </div>
      </div>
    </section>
  );
}
