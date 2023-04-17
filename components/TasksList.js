import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "@/features/tasks/taskSlice";
import { useRouter } from "next/router";
import { TbEditCircle, TbEditCircleOff } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";

const TasksList = ({ setNewTask }) => {
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
    <div className="w-full h-full max-w-2xl flex flex-col gap-3 pr-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex flex-col gap-3 border py-3 px-4 rounded-lg shadow ${
            task.completed === false ? "bg-white" : "bg-slate-100"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div
              className={`w-full h-full ${
                task.completed === false ? "no-underline" : "line-through"
              }`}
            >
              <h1 className="text-lg font-medium">{task.title}</h1>
              <p className="text-[#797979]">{task.description}</p>
            </div>
          </div>
          <div className="flex justify-between gap-3 w-full">
            <div
              className={`py-1 px-4 text-center rounded-md ${
                task.completed === false
                  ? "bg-slate-100"
                  : "bg-zinc-800 text-white border-black/30"
              }`}
            >
              {task.completed === false ? (
                <div className="flex gap-2 items-center text-sm">
                  Incompleted
                </div>
              ) : (
                <div className="flex gap-2 items-center text-sm">
                  <BsPatchCheckFill /> Completed
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 text-2xl">
              {task.completed === false ? (
                <button
                  onClick={() => {
                    setNewTask(true);
                    handleUpdate(task.id);
                  }}
                  className="rounded-md text-zinc-600 active:text-zinc-800 hover:text-zinc-500 duration-200"
                >
                  <TbEditCircle />
                </button>
              ) : (
                <TbEditCircleOff className="text-zinc-400 hover:text-zinc-500 duration-200 cursor-not-allowed" />
              )}
              <button
                onClick={() => handleDelete(task.id)}
                className="rounded-md text-zinc-600 active:text-zinc-800 hover:text-zinc-500 duration-200"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
