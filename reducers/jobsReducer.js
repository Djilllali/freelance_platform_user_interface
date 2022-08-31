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
    filters: {
      keyword: "",
      skills: [],
      domain: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
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
  setFilters,
} = jobsSlice.actions;

export const exploreJobs = () => (dispatch, getState) => {
  let filters = getState().jobs.filters;
  const config = {
    method: "post",
    url: exploreJobsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data: { filters },
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
export const updateFilters = (fl) => (dispatch, getState) => {
  dispatch(setFilters(fl));
  dispatch(exploreJobs());
};
export default jobsSlice.reducer;
