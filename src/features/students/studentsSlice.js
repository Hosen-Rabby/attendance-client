import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStudents } from "./studentsAPI";

const initialState = {
  students: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const students = await getStudents();
    return students;
  }
);
const studentsSlice = createSlice({
  name: "students",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.students = [];
        state.error = action.error?.message;
      });
  },
});

export default studentsSlice.reducer;
