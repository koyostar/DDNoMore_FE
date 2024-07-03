import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../utilities/user";

export default function CreateTaskModal({ open, close, onTaskCreated }) {
  const { user } = useContext(UserContext);
  const [taskData, setTaskData] = useState({
    title: "",
    dueDate: "",
    priority: "Normal",
    status: "To Do",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTaskData = { ...taskData, createdBy: user.id };

    try {
      const response = await axios.post("/tasks/create", updatedTaskData);

      toast.success("Task created successfully!");

      setTaskData({
        title: "",
        dueDate: "",
        priority: "Normal",
        status: "To Do",
        description: "",
      });

      onTaskCreated();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to create task. Please try again.");
      }
    }
  };

  const modalClass = open ? " fixed inset-0 z-10 overflow-y-auto" : "hidden";

  return (
    <div className={modalClass}>
      <div className="flex items-center justify-center h-3/4">
        <div className="fixed inset-0 opacity-30" onClick={close}></div>
        <div className="relative bg-lightsec p-8 rounded-lg w-11/12">
          <h3 className="text-lg font-medium mb-4">Create Task</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-darksec">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-darksec">
                Due Date:
              </label>
              <input
                type="date"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-darksec">
                Priority:
              </label>
              <div className="flex space-x-4">
                {["High", "Medium", "Normal", "Low"].map((level) => (
                  <label
                    key={level}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={level}
                      checked={taskData.priority === level}
                      onChange={handleChange}
                      className="form-radio text-indigo-600"
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-darksec">
                Status:
              </label>
              <div className="flex space-x-4">
                {["To Do", "In Progress", "Completed"].map((status) => (
                  <label
                    key={status}
                    className="inline-flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={taskData.status === status}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-darksec">
                Description:
              </label>
              <input
                type="text"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-darksec border border-transparent rounded-md hover:bg-darkacc focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
