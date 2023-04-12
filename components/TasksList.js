import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/features/tasks/taskSlice";
import Link from "next/link";
import { useRouter } from "next/router";

const TasksList = () => {

    const {push} = useRouter();
    const dispatch = useDispatch()

    const handleDelete = (id) => {
        push('/')
        dispatch(deleteTask(id))
    }

    const handleUpdate = (id) =>{
        push(`/update/${id}`)
        dispatch(updateTask(id))
    }

  const tasks = useSelector(state => state.tasks);

  return (
    <div className="p-5 flex flex-col gap-3">
        <h1 className="border-b text-center">{tasks.length}</h1>
      {tasks.map(task => (
        <div key={task.id} className="flex flex-col gap-3 border p-3 rounded-lg">
            <div className="flex flex-col gap-3">
            <div><h1 className="text-xl font-medium">{task.title}</h1>
            <p>{task.description}</p></div>
            <p className="py-2 border text-center rounded-lg">
                {task.completed ? 'Completed' : 'Incompleted'}
            </p>
            </div>
            <div className="flex justify-between gap-3 w-full">
            <button onClick={() => handleUpdate(task.id)} className="w-full rounded-md bg-black px-4 py-1 text-white">Update</button>
            <button onClick={() => handleDelete(task.id)} className="w-full rounded-md bg-black px-4 py-1 text-white">Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
