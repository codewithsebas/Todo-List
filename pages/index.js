import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";
import { useDispatch, useSelector } from "react-redux";
import { BsPatchPlus } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { useEffect, useState } from "react";
import Head from "next/head";
import { deleteTaskAll, fetchTasks } from "@/features/tasks/taskSlice";

const Home = () => {
  const [newTask, setNewTask] = useState(false);

  const handleDeleteAll = () => {
    dispatch(deleteTaskAll());
  };

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  return (
    <>
      <Head>
        <title>Notes App!</title>
      </Head>
      <main className="bg-[#fdfdfd] w-full h-screen flex flex-col gap-5 justify-start items-center px-4">
        <nav className="w-full max-w-2xl mt-10">
          <h1 className="font-semibold text-3xl">
            Hello and welcome to this Notes App
          </h1>
          <p className="text-lg text-black/50 font-medium">
            You´ve got {tasks.length} tasks coming up in the next days.
          </p>
        </nav>
        <div className="w-full flex justify-between max-w-2xl pr-2">
          <button
            onClick={() => setNewTask(!newTask)}
            className="bg-white flex gap-3 outline-none items-center shadow-md text-base text-zinc-800  font-medium py-2 px-4 rounded-lg duration-200 active:shadow-lg active:border-zinc-300 border"
          >
            <BsPatchPlus className="text-xl" />
            <p>Create a new note</p>
          </button>
          {tasks?.length >= 1 && (
            <button
              onClick={() => handleDeleteAll(tasks)}
              className="flex gap-3 items-center text-sm bg-zinc-800 text-white  font-medium px-4 rounded-md duration-200 active:bg-zinc-700"
            >
              <MdDeleteSweep className="text-xl" />
              <p>Clear all</p>
            </button>
          )}
        </div>
        <div
          className={`absolute bg-zinc-950/30 w-full h-full flex justify-center items-center duration-200 ${
            newTask
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <TaskForm setNewTask={setNewTask} />
        </div>
        <div className="w-full h-full max-w-2xl overflow-auto">
          {tasks?.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center text-lg text-black/50 font-medium">
              Create a new Note!{" "}
            </p>
          ) : (
            <TasksList setNewTask={setNewTask} />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
