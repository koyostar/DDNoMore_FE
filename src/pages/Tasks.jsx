import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskCard from "../components/TaskCard";
import axios from "axios";
import EditTaskModal from "../components/EditTaskModal";

export default function Tasks({ user, setUser }) {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("dueDate");
  const [filterArchived, setFilterArchived] = useState(false);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setTaskToEdit(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [sortCriterion, filterArchived, filterStatus]);

  const fetchTasks = async () => {
    try {
      if (!user || !user.username) {
        toast.error("User information is missing.");
        return;
      }
      let url = `/tasks/user/${user.username}`;
      if (filterArchived) {
        url += "?archived=true";
      }
      const response = await axios.get(url);
      const sortedTasks = sortTasks(response.data, sortCriterion);
      setTasks(sortedTasks);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to fetch tasks. Please try again later.");
      }
    }
  };

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

  const toggleArchivedFilter = () => {
    const newFilterArchived = !filterArchived;
    setFilterArchived(newFilterArchived);
  };

  const filterTasksByStatus = (task) => {
    if (filterStatus === "All") {
      return !task.isArchived;
    } else if (filterStatus === "Archived") {
      return task.isArchived;
    } else {
      return task.status === filterStatus && !task.isArchived;
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleTaskCreated = () => {
    closeModal();
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    closeEditModal();
    fetchTasks();
  };

  return (
    <div className="Tasks">
      <div className=" my-6 ">
        <div className="flex justify-between">
          <div>
            <span className="mr-2">Due Date</span>
            <label className="inline-flex items-center cursor-pointer">
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

          <div>
            <button
              className="ml-4 bg-lightsec inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md hover:bg-darkacc"
              onClick={openCreateModal}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className=" bg-lightacc grid grid-cols-5 space-x-4 rounded-full w-full">
          <button
            className={`text-md px-1 py-1 ${
              filterStatus === "All"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("All")}
          >
            All
          </button>
          <button
            className={`text-md px-1 py-1 ${
              filterStatus === "To Do"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("To Do")}
          >
            To Do
          </button>
          <button
            className={`text-md px-1 py-1 ${
              filterStatus === "In Progress"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`text-md px-1 py-1 ${
              filterStatus === "Completed"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("Completed")}
          >
            Completed
          </button>
          <button
            className={`text-md px-1 py-1 ${
              filterStatus === "Archived"
                ? "bg-darkacc text-darksec font-bold rounded-full"
                : " text-lightsec"
            }`}
            onClick={() => handleFilterChange("Archived")}
          >
            Archived
          </button>
        </div>
      </div>
      <CreateTaskModal
        open={isCreateModalOpen}
        close={closeCreateModal}
        onTaskCreated={handleTaskCreated}
      />
      <EditTaskModal
        open={isEditModalOpen}
        close={closeEditModal}
        onTaskUpdated={handleTaskUpdated}
        task={taskToEdit}
      />
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.filter(filterTasksByStatus).map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            fetchTasks={fetchTasks}
            onEdit={openEditModal}
          />
        ))}
      </div>
    </div>
  );
}
