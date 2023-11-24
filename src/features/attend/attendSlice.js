import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttend } from "./attendAPI";

const initialState = {
  attends: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchAttends = createAsyncThunk(
  "attend/fetchAttends",
  async () => {
    const attends = await getAttend();
    return attends;
  }
);
const attendSlice = createSlice({
  name: "attends",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttends.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAttends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.attends = action.payload;
      })
      .addCase(fetchAttends.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.attends = [];
        state.error = action.error?.message;
      });
  },
});

export default attendSlice.reducer;
