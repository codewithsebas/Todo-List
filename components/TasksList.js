import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/features/tasks/taskSlice";
import { useRouter } from "next/router";

const TasksList = () => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    push("/");
  };

  const handleUpdate = (id) => {
    push(`/update/${id}`);
    dispatch(updateTask(id));
  };

  const tasks = useSelector((state) => state.tasks);

  return (
    <div className="p-5 flex flex-col gap-3">
      <h1 className="border-b text-center">{tasks.length}</h1>
      {tasks.map((task) => (
        <div
          key={task.id}
          className= {`flex flex-col gap-3 border p-3 rounded-lg ${task.completed === false ? 'bg-white' : 'bg-slate-100'}`}
        >
          <div className="flex flex-col gap-3">
            <div
              className={`${
                task.completed === false ? "no-underline" : "line-through"
              }`}
            >
              <h1 className="text-xl font-medium">{task.title}</h1>
              <p>{task.description}</p>
            </div>
            <p className={`py-2 border text-center rounded-lg ${task.completed === false ? 'bg-slate-100' : 'bg-green-200 border-black/30'}`}>
              {task.completed === false ? "Incompleted" : "Completed"}
            </p>
          </div>
          <div className="flex justify-between gap-3 w-full">
            {task.completed === false ? (
              <button
                onClick={() => handleUpdate(task.id)}
                className="w-full rounded-md bg-black px-4 py-1 text-white"
              >
                Update
              </button>
            ) : (
              null
            )}
            <button
              onClick={() => handleDelete(task.id)}
              className={`w-full rounded-md px-4 py-2 text-white ${task.completed === false ? 'bg-black' : 'bg-black/50'}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
