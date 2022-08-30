import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import dashboardReducer from "../reducers/dashboardReducer";
import jobsReducer from "../reducers/jobsReducer";
import jobdetailsReducer from "../reducers/jobdetailsReducer";
import myjobsReducer from "../reducers/myjobsReducer";
import financialdashboardReducer from "../reducers/financialdashboardReducer";
export default configureStore({
  reducer: {
    login: loginReducer,
    dashboard: dashboardReducer,
    jobs: jobsReducer,
    jobdetails: jobdetailsReducer,
    myjobs: myjobsReducer,
    financialdashboard: financialdashboardReducer,
  },
});
