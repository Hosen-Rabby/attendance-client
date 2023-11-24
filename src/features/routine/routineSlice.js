import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoutine } from "./routineAPI";

const initialState = {
  routines: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchRoutine = createAsyncThunk(
  "routine/fetchRoutine",
  async () => {
    const routine = await getRoutine();
    return routine;
  }
);
const routineSlice = createSlice({
  name: "routine",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutine.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.routines = action.payload;
      })
      .addCase(fetchRoutine.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.routines = [];
        state.error = action.error?.message;
      });
  },
});

export default routineSlice.reducer;
