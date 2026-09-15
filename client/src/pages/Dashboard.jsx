import { useContext, useEffect, useState } from "react";
import TaskContext from "../context/TaskContext";
import AuthContext from "../context/AuthContext";

export default function Dashboard() {
  const {
    tasks,
    allTasksController,
    addTaskController,
    updateTaskController,
    deleteTaskController,
  } = useContext(TaskContext);

  const { user, logoutController } = useContext(AuthContext);

  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const [newTaskDetail, setNewTaskDetail] = useState({
    task_desc: "",
  });

  const [updatedTaskData, setUpdatedTaskData] = useState({
    task_desc: "",
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    allTasksController();
  }, []);

  const handleChange = (event) => {
    setNewTaskDetail((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdateChange = (event) => {
    setUpdatedTaskData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddTask = async (event) => {
    event.preventDefault();

    await addTaskController(newTaskDetail);

    setNewTaskDetail({
      task_desc: "",
    });
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.task_id);

    setUpdatedTaskData({
      task_desc: task.task_desc,
    });
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);

    setUpdatedTaskData({
      task_desc: "",
    });
  };

  const handleUpdateTask = async (event, task) => {
    event.preventDefault();

    await updateTaskController(task.task_id, {
      task_desc: updatedTaskData.task_desc,
      completed: task.completed,
    });

    setEditingTaskId(null);

    setUpdatedTaskData({
      task_desc: "",
    });
  };

  const handleToggleComplete = (task) => {
    updateTaskController(task.task_id, {
      task_desc: task.task_desc,
      completed: !task.completed,
    });
  };

  const handleDeleteTask = (taskId) => {
    deleteTaskController(taskId);
  };

  const completedCount = tasks.filter((task) => task.completed).length;

  const pendingCount = tasks.length - completedCount;

  const getHeading = () => {
    if (activeFilter === "completed") return "Completed";
    if (activeFilter === "pending") return "Pending";

    return "All Tasks";
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.task_desc
      .toLowerCase()
      .includes(search.toLowerCase());

    if (activeFilter === "completed") {
      return task.completed && matchesSearch;
    }

    if (activeFilter === "pending") {
      return !task.completed && matchesSearch;
    }

    return matchesSearch;
  });

  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  const todaysDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#faf8f3] text-[#171513]">
      <div className="flex min-h-screen">
        <aside className="hidden md:flex w-64 bg-white border-r border-black/5 flex-col">
          <div className="px-6 py-6">
            <div className="text-xl font-bold tracking-tight">TaskManager</div>
          </div>

          <div className="px-4 mt-4">
            <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Tasks
            </p>

            <button
              onClick={() => setActiveFilter("All")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeFilter === "All"
                  ? "bg-[#faf8f3] font-semibold"
                  : "text-gray-500 hover:bg-[#faf8f3] hover:text-[#171513]"
              }`}
            >
              <span>All</span>
              <span className="text-xs text-gray-400">{tasks.length}</span>
            </button>

            <button
              onClick={() => setActiveFilter("completed")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeFilter === "completed"
                  ? "bg-[#faf8f3] font-semibold"
                  : "text-gray-500 hover:bg-[#faf8f3] hover:text-[#171513]"
              }`}
            >
              <span>Completed</span>
              <span className="text-xs text-gray-400">{completedCount}</span>
            </button>

            <button
              onClick={() => setActiveFilter("pending")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                activeFilter === "pending"
                  ? "bg-[#faf8f3] font-semibold"
                  : "text-gray-500 hover:bg-[#faf8f3] hover:text-[#171513]"
              }`}
            >
              <span>Pending</span>
              <span className="text-xs text-gray-400">{pendingCount}</span>
            </button>
          </div>

          <div className="mt-auto px-6 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">
                Progress
              </span>

              <span className="text-xs font-semibold">{progress}%</span>
            </div>

            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#ff6c37] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <header className="h-20 border-b border-black/5 flex items-center justify-between px-5 md:px-8">
            <div>
              <p className="text-xs text-gray-400 mb-1">Task Manager</p>

              <h1 className="text-lg md:text-xl font-semibold">
                {getHeading()}
              </h1>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="flex items-center gap-3"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">
                    {user?.username || "User"}
                  </p>

                  <p className="text-xs text-gray-400">{user?.email || ""}</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#171513] text-white flex items-center justify-center text-sm font-semibold">
                  {user?.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </button>

              {showProfile && (
                <div className="absolute right-0 top-14 w-52 bg-white border border-black/5 rounded-xl shadow-sm p-2 z-20">
                  <div className="px-3 py-2 mb-1">
                    <p className="text-sm font-semibold">
                      {user?.username || "User"}
                    </p>

                    <p className="text-xs text-gray-400 truncate">
                      {user?.email || ""}
                    </p>
                  </div>

                  <div className="h-px bg-black/5 my-1" />

                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-[#faf8f3] hover:text-[#171513]">
                    Delete Account
                  </button>

                  <button
                    onClick={logoutController}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="px-5 md:px-8 py-7 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
              <div>
                <p className="text-sm text-gray-400 mb-1">{todaysDate}</p>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  {getHeading()}
                </h2>

                <p className="text-sm text-gray-400 mt-2">
                  {completedCount} of {tasks.length} tasks completed
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={`md:hidden px-3 py-2 rounded-lg text-xs font-medium ${
                    activeFilter === "All"
                      ? "bg-[#171513] text-white"
                      : "bg-white border border-black/5 text-gray-500"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setActiveFilter("completed")}
                  className={`md:hidden px-3 py-2 rounded-lg text-xs font-medium ${
                    activeFilter === "completed"
                      ? "bg-[#171513] text-white"
                      : "bg-white border border-black/5 text-gray-500"
                  }`}
                >
                  Done
                </button>

                <button
                  onClick={() => setActiveFilter("pending")}
                  className={`md:hidden px-3 py-2 rounded-lg text-xs font-medium ${
                    activeFilter === "pending"
                      ? "bg-[#171513] text-white"
                      : "bg-white border border-black/5 text-gray-500"
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>

            <div className="mb-5">
              <div className="bg-white border border-black/5 rounded-2xl px-4 flex items-center gap-3">
                <span className="text-gray-400 text-sm">⌕</span>

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search tasks..."
                  className="input flex-1 border-none bg-transparent focus:outline-none focus:border-none"
                />
              </div>
            </div>

            <form
              className="bg-white border border-black/5 rounded-2xl p-3 mb-5 flex gap-3"
              onSubmit={handleAddTask}
            >
              <input
                type="text"
                name="task_desc"
                value={newTaskDetail.task_desc}
                onChange={handleChange}
                placeholder="What needs to be done?"
                className="input flex-1 border-none bg-transparent focus:outline-none focus:border-none"
              />

              <button
                type="submit"
                className="btn h-10 min-h-10 rounded-xl bg-[#ff6c37] hover:bg-[#e85d2a] text-white border-none px-5"
              >
                Add
              </button>
            </form>

            <div className="space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-2xl px-6 py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f3] mx-auto flex items-center justify-center text-xl mb-4">
                    ✓
                  </div>

                  <h3 className="font-semibold mb-1">No tasks found</h3>

                  <p className="text-sm text-gray-400">
                    {search
                      ? "Try searching for something else."
                      : "You're all caught up."}
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.task_id}
                    className="group bg-white border border-black/5 rounded-2xl px-4 md:px-5 py-4"
                  >
                    {editingTaskId === task.task_id ? (
                      <form
                        onSubmit={(event) => handleUpdateTask(event, task)}
                        className="flex items-center gap-3"
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(task)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            task.completed
                              ? "bg-[#ff6c37] border-[#ff6c37] text-white"
                              : "border-gray-300 hover:border-[#ff6c37]"
                          }`}
                        >
                          {task.completed && <span className="text-xs">✓</span>}
                        </button>

                        <input
                          type="text"
                          name="task_desc"
                          value={updatedTaskData.task_desc}
                          onChange={handleUpdateChange}
                          autoFocus
                          className="input flex-1 h-10 min-h-10 border-none bg-transparent px-0 focus:outline-none focus:border-none text-[15px]"
                        />

                        <button
                          type="submit"
                          className="w-8 h-8 rounded-lg text-[#ff6c37] hover:bg-orange-50 transition-colors"
                          title="Save task"
                        >
                          ✓
                        </button>

                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="w-8 h-8 rounded-lg text-gray-400 hover:text-[#171513] hover:bg-[#faf8f3] transition-colors"
                          title="Cancel"
                        >
                          ×
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-3 md:gap-4">
                        <button
                          type="button"
                          onClick={() => handleToggleComplete(task)}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            task.completed
                              ? "bg-[#ff6c37] border-[#ff6c37] text-white"
                              : "border-gray-300 hover:border-[#ff6c37]"
                          }`}
                        >
                          {task.completed && <span className="text-xs">✓</span>}
                        </button>

                        <span
                          className={`flex-1 text-[15px] ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-[#171513]"
                          }`}
                        >
                          {task.task_desc}
                        </span>

                        <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg text-gray-400 hover:text-[#171513] hover:bg-[#faf8f3] transition-colors"
                            title="Edit task"
                            onClick={() => handleEdit(task)}
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete task"
                            onClick={() => handleDeleteTask(task.task_id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                Stay focused. One task at a time.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
