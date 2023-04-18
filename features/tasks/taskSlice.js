import { createSlice } from "@reduxjs/toolkit";
import { postData } from "../actions/postData";
import axios from "axios";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (_state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
      const taskCreated = action.payload;
      postData(taskCreated);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task._id == action.payload);
      if (taskFound) {
        const index = state.indexOf(taskFound);
        state.splice(index, 1);
      }
    },
    deleteTaskAll: (state, _action) => {
      while (state?.length > 0) {
        state.splice(0, 1);
      }
    },
    updateTask: (state, action) => {
      const { _id, title, description, completed } = action.payload;
      const foundTask = state.find((task) => task._id === id);

      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
        foundTask.completed = completed;
      }
    },
  },
});

export const { setTasks, addTask, deleteTask, deleteTaskAll, updateTask } =
  taskSlice.actions;

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000/"); // Aquí debes colocar la URL de tu servidor
      dispatch(setTasks(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default taskSlice.reducer;
