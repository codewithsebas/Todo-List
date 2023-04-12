import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "taks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
        const taskFound = state.find(task => task.id === action.payload)
        if(taskFound) {
            state.splice((state.indexOf), 1)
        }
    }
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
