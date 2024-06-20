import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskCard from "../components/TaskCard";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/tasks");
        setTasks(response.data);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Failed to fetch tasks. Please try again later.");
        }
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="Tasks">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <button
        className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
        onClick={openModal}
      >
        Create Task
      </button>
      <CreateTaskModal open={isModalOpen} close={closeModal} />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
