import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "@/features/tasks/taskSlice";

const TasksList = () => {

    const dispatch = useDispatch()

    const handleDelete = (id) => {
        dispatch(deleteTask(id))
    }

  const tasks = useSelector(state => state.tasks);
  console.log(tasks);
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
            <p>{task.id}</p>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="flex gap-3">
            <button className="bg-black px-4 py-1 text-white">Update</button>
            <button onClick={() => handleDelete(task.id)} className="bg-black px-4 py-1 text-white">Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
