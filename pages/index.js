import { useSelector } from "react-redux"

const Home = () => {

  const tasksState = useSelector(state => state.tasks)
  console.log(tasksState);
  return (
    <main>
      
    </main>
  )
}

export default Home;
