import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function TaskCard({ task, fetchTasks }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Normal":
        return "bg-green-500";
      case "Low":
        return "bg-blue-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To Do":
        return "bg-blue-200";
      case "In Progress":
        return "bg-yellow-200";
      case "Completed":
        return "bg-green-200";
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await axios.delete(`/tasks/${task._id}`);
        toast.success(response.data.message);
        fetchTasks();
      } catch (error) {
        toast.error("Failed to delete task. Please try again.");
      }
    }
  };

  const handleArchive = async () => {
    try {
      console.log(`Archiving task with ID: ${task._id}`);

      const response = await axios.put(`/tasks/${task._id}/archive`);
      toast.success(response.data.message);
      fetchTasks();
    } catch (error) {
      console.error("Error archiving task:", error);

      toast.error("Failed to archive task. Please try again.");
    }
  };

  const handleRestore = async () => {
    try {
      const response = await axios.put(`/tasks/${task._id}/restore`);
      toast.success(response.data.message);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to restore task. Please try again.");
    }
  };

  return (
    <div>
      <div
        key={task._id}
        className="relative bg-lightpri text-darksec shadow-md rounded-t-lg p-4"
      >
        <div
          className={`absolute top-2 right-0 p-1 text-white text-xs font-bold ${getPriorityColor(
            task.priority
          )} rounded-l-lg`}
        >
          {task.priority}
        </div>
        <h2 className="text-lg text-center font-bold">{task.title}</h2>
        <p className="text-md text-gray-600 font-bold ">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className="mt-2 text-gray-700">{task.description}</p>
        <div className="flex mt-4 justify-center">
          <button
            onClick={handleDelete}
            className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none"
          >
            <MdDelete />
          </button>
          {task.isArchived ? (
            <button
              onClick={handleRestore}
              className="px-4 py-2 text-sm ml-2 font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none"
            >
              <BiSolidHide />
            </button>
          ) : (
            <button
              onClick={handleArchive}
              className="px-4 py-2 text-sm ml-2  font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
            >
              <BiSolidShow />
            </button>
          )}
        </div>
      </div>

      <div
        className={`text-darkpri text-center text-sm font-medium rounded-b-lg ${getStatusColor(
          task.status
        )}`}
      >
        {task.status}
      </div>
    </div>
  );
}
