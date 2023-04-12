import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";
import { useSelector } from "react-redux"

const Home = () => {
  const tasksState = useSelector(state => state.tasks)
  return (
    <main>
      <TaskForm />
      <TasksList />
    </main>
  )
}

export default Home;
