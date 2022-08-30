import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchJobsUrl } from "../constants";

export const jobsSlice = createSlice({
  name: "myjobs",
  initialState: {
    fetchJobsResult: null,
    fetchJobsError: null,
    isFetchingJobs: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setfetchJobsResult: (state, action) => {
      state.fetchJobsResult = action.payload;
      state.fetchJobsError = null;

      state.isFetchingJobs = false;
    },
    setfetchJobsError: (state, action) => {
      state.fetchJobsError = action.payload;
      state.fetchJobsResult = null;

      state.isFetchingJobs = false;
    },
    setFetchingJobs: (state, action) => {
      state.isFetchingJobs = action.payload;
    },
  },
});

export const {
  setPathname,
  setfetchJobsResult,
  setfetchJobsError,
  setFetchingJobs,
} = jobsSlice.actions;

export const fetchJobs = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: fetchJobsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setFetchingJobs(true));

  axios(config)
    .then((response) => {
      console.log("====== fetch jobs ", response.data);
      dispatch(setfetchJobsResult(response.data));
    })
    .catch((response) => {
      dispatch(setfetchJobsResult(response.message));
    });
};
export default jobsSlice.reducer;
