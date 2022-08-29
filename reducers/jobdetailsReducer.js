import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JobDetailsUrl } from "../constants";

export const jobDetailsSlice = createSlice({
  name: "jobdetails",
  initialState: {
    jobDetailsResult: null,
    jobDetailsError: null,
    isFetchingJob: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setjobDetailsResult: (state, action) => {
      state.jobDetailsResult = action.payload;
      state.jobDetailsError = null;

      state.isFetchingJob = false;
    },
    setjobDetailsError: (state, action) => {
      state.jobDetailsError = action.payload;
      state.jobDetailsResult = null;

      state.isFetchingJob = false;
    },
    setIsFetchingJob: (state, action) => {
      state.isFetchingJob = action.payload;
    },
  },
});

export const {
  setPathname,
  setjobDetailsResult,
  setjobDetailsError,
  setIsFetchingJob,
} = jobDetailsSlice.actions;

export const getJobDetails = (id) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: `${JobDetailsUrl}${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setIsFetchingJob(true));

  axios(config)
    .then((response) => {
      console.log("====== explore jobs ", response.data);
      dispatch(setjobDetailsResult(response.data));
    })
    .catch((response) => {
      dispatch(setjobDetailsResult(response.message));
    });
};
export default jobDetailsSlice.reducer;
