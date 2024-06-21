import React, { useEffect, useState } from "react";
import { FaPause, FaPlay, FaStop } from "react-icons/fa";

export default function Timer() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const profile = await api.getProfile();
        setTasks(profile.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

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

  const startTimer = async () => {
    try {
      await api.updateTaskStatus(`/timer/start/${selectedTask._id}`, {
        status: "in progress",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error starting task:", error.message);
    }
  };

  const pauseTimer = async () => {
    try {
      await api.updateTaskStatus(`/timer/pause/${selectedTask._id}`, {
        status: "paused",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error pausing task:", error.message);
    }
  };

  const endTimer = async () => {
    try {
      await api.updateTaskStatus(`/timer/end/${selectedTask._id}`, {
        status: "completed",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error ending task:", error.message);
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
    <div className="timer-container bg-lightacc text-darkpri p-5 rounded-lg md:box-content w-2/3">
      <h1 className="text-center">Timer</h1>
      <div className="m-5">
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

      <div className="m-5">
        <h2>{selectedTask ? selectedTask.title : ""}</h2>
        <p>
          Start Date:&emsp;
          {selectedTask
            ? selectedTask.startDate
              ? new Date(selectedTask.startDate).toLocaleString()
              : "Not started"
            : ""}
        </p>
        <p>
          Completed Date:&emsp;
          {selectedTask
            ? selectedTask.completedDate
              ? new Date(selectedTask.completedDate).toLocaleString()
              : "Not completed"
            : ""}
        </p>
        <p>Status:&emsp; {selectedTask ? selectedTask.status : ""}</p>
        <div>
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

      <div className="flex space-x-4 text-lightpri m-5">
        <button
          onClick={startTimer}
          disabled={!selectedTask || selectedTask.status === "in progress"}
          className={`px-4 py-2 rounded ${
            !selectedTask || selectedTask.status === "in progress"
              ? "bg-disabled cursor-not-allowed"
              : "bg-enabled hover:bg-blue-700"
          }`}
        >
          <FaPlay />
        </button>
        <button
          onClick={pauseTimer}
          disabled={!selectedTask || selectedTask.status !== "in progress"}
          className={`px-4 py-2 rounded ${
            !selectedTask || selectedTask.status !== "in progress"
              ? "bg-disabled cursor-not-allowed"
              : "bg-enabled hover:bg-blue-700"
          }`}
        >
          <FaPause />
        </button>
        <button
          onClick={endTimer}
          disabled={!selectedTask || selectedTask.status === "completed"}
          className={`px-4 py-2 rounded ${
            !selectedTask || selectedTask.status === "completed"
              ? "bg-disabled cursor-not-allowed"
              : "bg-enabled hover:bg-blue-700"
          }`}
        >
          <FaStop />
        </button>
      </div>
    </div>
  );
}
