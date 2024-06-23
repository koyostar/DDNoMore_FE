import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";

export default function Timer({ user }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (selectedTask && !selectedTask.completedDate) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedTask]);

  const fetchTasks = async () => {
    try {
      if (!user || !user.username) {
        console.error("User information is missing.");
        return;
      }
      const response = await axios.get(`/tasks/user/${user.username}`);
      setTasks(response.data);
      if (selectedTask) {
        const updatedSelectedTask = response.data.find(
          (t) => t._id === selectedTask._id
        );
        if (updatedSelectedTask) {
          setSelectedTask(updatedSelectedTask);
        } else {
          setSelectedTask(null);
        }
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTask = async (url, message) => {
    try {
      const response = await axios.put(url);
      fetchTasks();
    } catch (error) {
      console.error(
        `Error ${message}:`,
        error.response ? error.response.data.message : error.message
      );
    }
  };

  const startTimer = () => {
    if (!selectedTask) return;
    updateTask(`/timer/${selectedTask._id}/start`, "Starting task");
  };

  const pauseTimer = () => {
    if (!selectedTask) return;
    updateTask(`/timer/${selectedTask._id}/pause`, "Pausing task");
  };

  const endTimer = () => {
    if (!selectedTask) return;
    updateTask(`/timer/${selectedTask._id}/end`, "Ending task");
  };

  const resetTimer = () => {
    if (!selectedTask) return;
    if (window.confirm("Are you sure you want to reset the timer?")) {
      updateTask(`/timer/${selectedTask._id}/reset`, "Reseting timer");
    }
  };

  const handleTaskChange = (event) => {
    const taskId = event.target.value;
    const task = tasks.find((t) => t._id === taskId);
    setSelectedTask(task);
  };

  const formatDuration = (ms) => {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const parseDuration = (duration) => {
    const parts = duration.split(":");
    const hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    const seconds = parseInt(parts[2], 10) || 0;

    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
  };

  const calculateRunningTime = () => {
    if (selectedTask && selectedTask.startDate) {
      const startDate = new Date(selectedTask.startDate);
      const loggedTime = parseDuration(selectedTask.loggedTime);
      const currentTimeMs = currentTime.getTime();
      const elapsedTime = currentTimeMs - startDate.getTime();
      return formatDuration(elapsedTime + loggedTime);
    }
    return "00:00:00";
  };

  return (
    <div className="flex items-center justify-center">
      <div className="timer-container flex flex-col items-center bg-lightacc text-darkpri p-5 rounded-lg md:box-content w-3/4">
        <div className="m-5 text-center">
          Task:&emsp;
          <select onChange={handleTaskChange} defaultValue="">
            <option value="" disabled>
              Select a task
            </option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        <div className="m-5 ">
          <h2 className="text-darksec text-center font-bold text-2xl mb-5">
            {selectedTask ? selectedTask.title : "No Task Selected"}
          </h2>
          <div className="flex flex-col text-xl space-y-3">
            <p className="flex justify-between">
              <span className="mr-6">Start Date:&emsp;</span>
              <span className="font-bold text-left">
                {selectedTask
                  ? selectedTask.startDate
                    ? new Date(selectedTask.startDate).toLocaleString()
                    : "Not started"
                  : ""}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="mr-6">Completed Date:&emsp;</span>
              <span className="font-bold text-left">
                {selectedTask
                  ? selectedTask.completedDate
                    ? new Date(selectedTask.completedDate).toLocaleString()
                    : "Not completed"
                  : ""}
              </span>
            </p>
            <p className="flex justify-between">
              <span className="mr-6">Status:&emsp;</span>
              <span className="font-bold text-left">
                {selectedTask ? selectedTask.status : ""}
              </span>
            </p>
          </div>
          <div className="text-center font-bold text-xl mt-8">
            Logged Time:&emsp;
            <br />
            <span className="timer text-4xl">
              {selectedTask
                ? selectedTask.completedDate
                  ? selectedTask.loggedTime
                  : calculateRunningTime()
                : "00:00:00"}
            </span>
          </div>
        </div>

        <div className="text-2xl flex space-x-4 justify-center text-lightpri ">
          <button
            onClick={startTimer}
            disabled={!selectedTask || selectedTask.status === "In Progress"}
            className={`px-4 py-2 rounded ${
              !selectedTask || selectedTask.status === "In Progress"
                ? "bg-disabled cursor-not-allowed"
                : "bg-enabled hover:bg-blue-700"
            }`}
          >
            <FaPlay />
          </button>
          <button
            onClick={pauseTimer}
            disabled={!selectedTask || selectedTask.status !== "In Progress"}
            className={`px-4 py-2 rounded ${
              !selectedTask || selectedTask.status !== "In Progress"
                ? "bg-disabled cursor-not-allowed"
                : "bg-enabled hover:bg-blue-700"
            }`}
          >
            <FaPause />
          </button>
          <button
            onClick={endTimer}
            disabled={
              !selectedTask ||
              selectedTask.status === "Completed" ||
              selectedTask.status === "To Do"
            }
            className={`px-4 py-2 rounded ${
              !selectedTask ||
              selectedTask.status === "Completed" ||
              selectedTask.status === "To Do"
                ? "bg-disabled cursor-not-allowed"
                : "bg-enabled hover:bg-blue-700"
            }`}
          >
            <FaStop />
          </button>{" "}
        </div>
        <div className="flex justify-center text-lightpri m-5">
          <button
            onClick={resetTimer}
            disabled={!selectedTask}
            className={`px-4 py-2 rounded ${
              !selectedTask
                ? "bg-disabled cursor-not-allowed"
                : "bg-enabled hover:bg-blue-700"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
