import React from "react";

export default function TaskCard({ task }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "normal":
        return "text-green-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div key={task._id} className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p className="text-sm text-gray-600">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p
        className={`text-sm font-medium mt-2 ${getPriorityColor(
          task.priority
        )}`}
      >
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </p>
      <p className="mt-2 text-gray-700">{task.description}</p>
    </div>
  );
}
