import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("dueDate");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const profile = await api.getProfile();
        const sortedTasks = sortTasks(profile.tasks, sortCriterion);
        setTasks(sortedTasks);
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
  }, [sortCriterion]);

  const sortTasks = (tasks, criterion) => {
    if (criterion === "dueDate") {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (criterion === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Normal: 3, Low: 4 };
      return tasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }
    return tasks;
  };

  const toggleSortCriterion = () => {
    setSortCriterion(sortCriterion === "dueDate" ? "priority" : "dueDate");
  };

  const filterTasksByStatus = (task) => {
    if (filterStatus === "All") {
      return true;
    } else {
      return task.status === filterStatus;
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  return (
    <div className="Tasks">
      <Toaster />
      <div className="flex  mb-6 w-full justify-around">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button
          className="bg-lightsec absolute right-4 mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md hover:bg-darkacc "
          onClick={openModal}
        >
          Add Task
        </button>
      </div>
      <div className="flex justify-around mt-6">
        <div className=" bg-lightacc grid grid-cols-4 space-x-4 rounded-full w-2/3">
          <button
            className={`px-3 py-1 ${
              filterStatus === "All"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 ${
              filterStatus === "To Do"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("To Do")}
          >
            To Do
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              filterStatus === "In Progress"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              filterStatus === "Completed"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("Completed")}
          >
            Completed
          </button>
        </div>
        <div className="flex items-center ml-4">
          <div className="flex items-center">
            <span className="mr-2">Due Date</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={sortCriterion === "priority"}
                onChange={toggleSortCriterion}
              />
              <div className="w-11 h-6 bg-lightsec rounded-full"></div>
              <div
                className={`dot bg-darksec absolute w-5 h-5 m-1 rounded-full ${
                  sortCriterion === "priority" ? "translate-x-3/4" : ""
                }`}
              ></div>
            </label>
            <span className="ml-2">Priority</span>
          </div>
        </div>
      </div>
      <CreateTaskModal open={isModalOpen} close={closeModal} />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.filter(filterTasksByStatus).map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
