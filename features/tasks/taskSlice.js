import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks: (_state, action) => {
      return action.payload;
    },
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

export const { setTasks, addTask, deleteTask, deleteTaskAll, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
