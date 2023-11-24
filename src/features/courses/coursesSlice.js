import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourses } from "./coursesAPI";

const initialState = {
  courses: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const courses = await getCourses();
    return courses;
  }
);
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.courses = [];
        state.error = action.error?.message;
      });
  },
});

export default coursesSlice.reducer;
