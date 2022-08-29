import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { exploreJobsUrl } from "../constants";

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    exploreJobsResult: null,
    exploreJobsError: null,
    isExploringJobs: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setExploreJobsResult: (state, action) => {
      state.exploreJobsResult = action.payload;
      state.exploreJobsError = null;

      state.isExploringJobs = false;
    },
    setExploreJobsError: (state, action) => {
      state.exploreJobsError = action.payload;
      state.exploreJobsResult = null;

      state.isExploringJobs = false;
    },
    setExploringJobs: (state, action) => {
      state.isExploringJobs = action.payload;
    },
  },
});

export const {
  setPathname,
  setExploreJobsResult,
  setExploreJobsError,
  setExploringJobs,
} = jobsSlice.actions;

export const exploreJobs = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: exploreJobsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setExploringJobs(true));

  axios(config)
    .then((response) => {
      console.log("====== explore jobs ", response.data);
      dispatch(setExploreJobsResult(response.data));
    })
    .catch((response) => {
      dispatch(setExploreJobsResult(response.message));
    });
};
export default jobsSlice.reducer;
