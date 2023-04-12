import { useSelector } from "react-redux";

const TaskForm = () => {
    const stateTasks = useSelector(state => state.tasks)
    return (
        <div></div>
    )
}

export default TaskForm;