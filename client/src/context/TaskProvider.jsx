import { useState } from "react";
import api from "../services/api.js";
import TaskContext from "./TaskContext";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const allTasksController = async () => {
    try {
      const { data } = await api.get("/api/all-tasks");
      setTasks(data);
    } catch (error) {
      console.log("Error in all tasks controller:", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  const addTaskController = async (taskData) => {
    try {
      const { data } = await api.post("/api/add-task", taskData);
      setTasks((prev) => [...prev, data?.new_task]);
      toast.success(data?.message);
    } catch (error) {
      console.log("Error in add task controller: ", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  const updateTaskController = async (taskId, updatedTaskData) => {
    try {
      const { data } = await api.put(`/api/task/${taskId}`, updatedTaskData);

      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === taskId ? data.updated_task : task,
        ),
      );

      toast.success("Task updated successfully.");
    } catch (error) {
      console.log("Error in update task controller:", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  const deleteTaskController = async (taskId) => {
    try {
      const { data } = await api.delete(`/api/delete/task/${taskId}`);
      toast.success(data?.message);
      setTasks((prev) => prev.filter((task) => task.task_id != taskId));
    } catch (error) {
      console.log("Error in delete task controller: ", error);
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  const value = {
    tasks,
    allTasksController,
    addTaskController,
    updateTaskController,
    deleteTaskController,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
