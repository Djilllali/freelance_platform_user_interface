import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import dashboardReducer from "../reducers/dashboardReducer";
import jobsReducer from "../reducers/jobsReducer";
import jobdetailsReducer from "../reducers/jobdetailsReducer";
export default configureStore({
  reducer: {
    login: loginReducer,
    dashboard: dashboardReducer,
    jobs: jobsReducer,
    jobdetails: jobdetailsReducer,
  },
});
