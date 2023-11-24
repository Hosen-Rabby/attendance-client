import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccount } from "./accountAPI";

const initialState = {
  accounts: [],
  isLoading: false,
  isError: false,
  error: "",
};

// async thunk
export const fetchAccounts = createAsyncThunk(
  "attend/fetchAccounts",
  async () => {
    const accounts = await getAccount();
    return accounts;
  }
);
const accountSlice = createSlice({
  name: "accounts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.accounts = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.accounts = [];
        state.error = action.error?.message;
      });
  },
});

export default accountSlice.reducer;
