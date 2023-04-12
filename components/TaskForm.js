import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "@/features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
import { useRouter } from "next/router";

const TaskForm = () => {
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
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
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
  };

  useEffect(() => {
    if (query.id) {
      setTask(tasks.find((task) => task.id === query.id));
    }
  }, [query.id, tasks]);

  return (
    <form
      onSubmit={handleSubmit}
      className="border m-5 p-3 rounded-lg flex flex-col justify-center items-center"
    >
      <div className="w-full flex flex-col gap-3">
        <input
          className="outline-none"
          type="text"
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={task.title}
        />
        <textarea
          className="outline-none"
          name="description"
          onChange={handleChange}
          placeholder="Description"
          cols="10"
          rows="1"
          value={task.description}
        ></textarea>
        {query.id ? (
          <div className="flex gap-3">
            <div className="flex gap-2">
              <label htmlFor="incompleted">Incompleted</label>
              <input
                type="radio"
                checked={task.completed}
                name="incompleted"
                id="incompleted"
              />
            </div>
          </div>
        ) : null}
      </div>
      <button className="mt-3 w-full bg-black px-7 rounded-lg py-2 text-white">
        Save
      </button>
    </form>
  );
};

export default TaskForm;
