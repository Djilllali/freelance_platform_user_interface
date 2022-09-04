import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDomainsUrl } from "../constants";

export const domainsSlice = createSlice({
  name: "domains",
  initialState: {
    domainsResult: null,
    domainsError: null,
    isFetching: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setDomainsResult: (state, action) => {
      state.domainsResult = action.payload;
      state.domainsError = null;

      state.isFetching = false;
    },
    setDomainsError: (state, action) => {
      state.domainsError = action.payload;
      state.domainsResult = null;

      state.isFetching = false;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setPathname, setDomainsResult, setDomainsError, setIsFetching } =
  domainsSlice.actions;

export const getDomains = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getDomainsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setIsFetching(true));

  axios(config)
    .then((response) => {
      console.log("====== explore jobs ", response.data);
      dispatch(setDomainsResult(response.data));
    })
    .catch((response) => {
      dispatch(setDomainsError(response.message));
    });
};
export default domainsSlice.reducer;
