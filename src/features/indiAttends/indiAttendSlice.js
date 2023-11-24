import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIndiAttend } from "./indiAttendsAPI";

const initialState = {
  indiAttend: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchIndiAttend = createAsyncThunk(
  "batch/fetchIndiAttend",
  async () => {
    const indiAttend = await getIndiAttend();
    return indiAttend;
  }
);
const indiAttendSlice = createSlice({
  name: "indiAttend",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndiAttend.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchIndiAttend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.indiAttend = action.payload;
      })
      .addCase(fetchIndiAttend.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.indiAttend = [];
        state.error = action.error?.message;
      });
  },
});

export default indiAttendSlice.reducer;
