import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBatches } from "./batchAPI";

const initialState = {
  batches: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchbatches = createAsyncThunk("batch/fetchbatches", async () => {
  const batches = await getBatches();
  return batches;
});
const batchesSlice = createSlice({
  name: "batches",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchbatches.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchbatches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.batches = action?.payload;
      })
      .addCase(fetchbatches.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.batches = [];
        state.error = action.error?.message;
      });
  },
});

export default batchesSlice.reducer;
