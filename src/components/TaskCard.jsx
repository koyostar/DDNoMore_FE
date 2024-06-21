import React from "react";

export default function TaskCard({ task }) {
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
