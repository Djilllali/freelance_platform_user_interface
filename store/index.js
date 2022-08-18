import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/loginReducer";
import dashboardReducer from "../reducers/dashboardReducer";
export default configureStore({
  reducer: {
    login: loginReducer,
    dashboard: dashboardReducer,
  },
});
