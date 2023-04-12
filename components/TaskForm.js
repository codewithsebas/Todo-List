import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "@/features/tasks/taskSlice";
import {v4 as uuid} from "uuid";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask({
        ...task,[e.target.name] : e.target.value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({
        ...task,
        id: uuid()
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        name="title"
        placeholder="Title"
      />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
        cols="30"
        rows="10"
      ></textarea>
      <button className="bg-black px-7 rounded-lg py-2 text-white">Save</button>
    </form>
  );
};

export default TaskForm;
