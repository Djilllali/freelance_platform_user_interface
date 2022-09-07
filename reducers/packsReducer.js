import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getpacksUrl } from "../constants";

export const packsSlice = createSlice({
  name: "packs",
  initialState: {
    packsResult: null,
    packsError: null,
    isFetching: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setpacksResult: (state, action) => {
      state.packsResult = action.payload;
      state.packsError = null;

      state.isFetching = false;
    },
    setpacksError: (state, action) => {
      state.packsError = action.payload;
      state.packsResult = null;

      state.isFetching = false;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setPathname, setpacksResult, setpacksError, setIsFetching } =
  packsSlice.actions;

export const getpacks = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getpacksUrl,
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
      dispatch(setpacksResult(response.data));
    })
    .catch((response) => {
      dispatch(setpacksError(response.message));
    });
};
export default packsSlice.reducer;
