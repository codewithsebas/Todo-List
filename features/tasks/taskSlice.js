import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id == action.payload);
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
      const { id, title, description, completed } = action.payload;
      const foundTask = state.find((task) => task.id === id);

      if (foundTask) {
        foundTask.title = title;
        foundTask.description = description;
        foundTask.completed = completed;
      }
    },
  },
});

export const { addTask, deleteTask, deleteTaskAll, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
