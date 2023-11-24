import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const departmentSlice = createSlice({
    name: "departments",
    initialState,
    // reducers:
    
});
