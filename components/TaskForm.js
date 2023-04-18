`use client`;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "@/features/tasks/taskSlice";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { VscClose } from "react-icons/vsc";
import { TbCircleCheck, TbCircleCheckFilled } from "react-icons/tb";
import { RxReset } from "react-icons/rx";

const TaskForm = ({ setNewTask, props }) => {
  // Function query /id/ Task
  const { push, query } = useRouter();

  // State of Task
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "checkbox" ? e.target.checked : value;

    setTask({ ...task, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.id) {
      dispatch(updateTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    push("/");
    handleReset();
  };

  const handleReset = () => {
    setTask({
      title: "",
      description: "",
      completed: false,
    });
  };

  useEffect(() => {
    if (tasks?.length === 0) {
      push("/");
    }
    if (query.id) {
      setTask(tasks.find((task) => task.id === query.id));
    }
  }, [push, query.id, tasks?.length, tasks]);

  // Function esc keydown
  useEffect(() => {
    function handleEscClose(event) {
      if (event.keyCode === 27) {
        push("/");
        setNewTask(false);
      }
    }

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full relative max-w-2xl bg-white border m-5 py-6 px-7 rounded-lg flex flex-col gap-4 items-start"
    >
      <h1 className="font-semibold text-3xl">New Note</h1>
      <div className="flex flex-col gap-3 w-full h-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium text-lg">
            Title
          </label>
          <input
            className="outline-none text-base font-medium border py-2 px-3 rounded-md duration-200 focus:border-sky-200 placeholder:font-normal"
            type="text"
            onChange={handleChange}
            name="title"
            placeholder="Your title"
            value={task.title}
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium text-lg">
            Description
          </label>
          <textarea
            className="outline-none font-base font-medium border py-2 px-3 rounded-md w-full h-20 duration-200 focus:border-sky-200 placeholder:font-normal"
            name="description"
            onChange={handleChange}
            placeholder="Your Description"
            maxLength="300"
            cols="10"
            value={task.description}
          ></textarea>
        </div>
        <div className="flex gap-2 nocopy">
          <input
            hidden
            id="completed"
            className="peer/published"
            type="checkbox"
            name="completed"
            value={task.completed}
            checked={task.completed}
            onChange={handleChange}
          />

          <label
            htmlFor="completed"
            className="text-lg font-medium flex items-center gap-2 cursor-pointer"
          >
            <div id="completed" className="text-2xl">
              {task.completed === true ? (
                <TbCircleCheckFilled />
              ) : (
                <TbCircleCheck />
              )}
            </div>
            Completed
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={handleReset}
            type="reset"
            className="w-full gap-3 flex basis-7 items-center justify-between shadow-md text-base bg-zinc-800 text-white  font-medium py-2 px-4 rounded-md duration-200 active:shadow-lg active:border-zinc-300 active:bg-zinc-700"
          >
            Reset <RxReset />
          </button>
          <button
            disabled={!task.title || !task.description}
            onClick={() => setNewTask(false)}
            className={`flex-none items-center shadow-md text-base  font-medium py-2 px-4 rounded-md duration-200 active:shadow-lg  
            ${
              !task.title || !task.description
                ? "bg-zinc-400 text-white cursor-not-allowed"
                : "bg-zinc-800 text-white active:border-zinc-300 active:bg-zinc-700"
            }`}
          >
            {query.id ? "Update Note" : "Create Note"}
          </button>
        </div>
      </div>
      <button
        className="absolute right-4 top-4 text-xl flex items-center gap-2"
        onClick={() => {
          setNewTask(false);
          push("/");
        }}
        type="button"
      >
        <p className="text-sm bg-black/5 px-3 py-1 rounded-md text-black/80">Esc</p>
        <VscClose />
      </button>
    </form>
  );
};

export default TaskForm;

{
  /* <button disabled={!task.title || !task.description} className="mt-3 w-full bg-black px-7 rounded-lg py-2 text-white">
        Save
      </button> */
}
