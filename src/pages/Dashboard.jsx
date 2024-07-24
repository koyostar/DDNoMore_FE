import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utilities/user";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [tasksInProgress, setTasksInProgress] = useState(0);
  const [tasksToDo, setTasksToDo] = useState(0);

  useEffect(() => {
    if (user && user.username) {
      fetchTasks();
    } else {
      console.log("User or username is undefined:", user);
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/tasks/user/${user.username}`);
      const tasks = response.data;

      const total = tasks.length;
      const completed = tasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const inProgress = tasks.filter(
        (task) => task.status === "In Progress"
      ).length;
      const toDo = tasks.filter((task) => task.status === "To Do").length;

      setTotalTasks(total);
      setCompletedTasks(completed);
      setTasksInProgress(inProgress);
      setTasksToDo(toDo);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <div className="dashboard-container mx-auto max-w-screen-lg px-4 py-8">
      {!!user && (
        <h2 className="text-2xl font-bold text-center text-darksec mb-4">
          Hi {user.name}
        </h2>
      )}

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-darkpri text-lightpri text-center p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl *:font-bold">{totalTasks}</p>
        </div>
        <div className="bg-darkpri text-lightpri text-center p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Tasks in Progress</h3>
          <p className="text-3xl font-bold">{tasksInProgress}</p>
        </div>
        <div className="bg-darkpri text-lightpri text-center p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Tasks to Do</h3>
          <p className="text-3xl font-bold">{tasksToDo}</p>
        </div>
        <div className="bg-darkpri text-lightpri text-center p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Completed Tasks</h3>
          <p className="text-3xl font-bold">{completedTasks}</p>
        </div>
      </div>
    </div>
  );
}
