import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import studentsReducer from "../features/students/studentsSlice";
import batchesReducer from "../features/batch/batchSlice";
import coursesReducer from "../features/courses/coursesSlice";
import attendReducer from "../features/attend/attendSlice";
import indiAttendReducer from "../features/indiAttends/indiAttendSlice";
import accountReducer from "../features/account/accountSlice";
import routineReducer from "../features/routine/routineSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    students: studentsReducer,
    batches: batchesReducer,
    courses: coursesReducer,
    attend: attendReducer,
    indiAttend: indiAttendReducer,
    accounts: accountReducer,
    routines: routineReducer,
  },
});


// requirements:

// previous days attend histoy.
// attendance persentance



