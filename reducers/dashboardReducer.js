import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { profileUrl, editprofileUrl } from "../constants";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    fetchProfileResult: null,
    fetchProfileError: null,
    isFetchingProfile: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setProfileResult: (state, action) => {
      state.fetchProfileResult = action.payload;
      state.fetchProfileError = null;

      state.isFetchingProfile = false;
    },
    setProfileError: (state, action) => {
      state.fetchProfileError = action.payload;
      state.fetchProfileResult = null;

      state.isFetchingProfile = false;
    },
    setFetchingProfile: (state, action) => {
      state.isFetchingProfile = action.payload;
    },
  },
});

export const {
  setPathname,
  setProfileResult,
  setProfileError,
  setFetchingProfile,
} = dashboardSlice.actions;

export const fetchUserProfile = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: profileUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setFetchingProfile(true));

  axios(config)
    .then((response) => {
      dispatch(setProfileResult(response.data));
    })
    .catch((response) => {
      dispatch(setProfileError(response.message));
    });
};
export const editProfile = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: editprofileUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data: data,
  };
  console.log("start fetching ...");
  dispatch(setFetchingProfile(true));

  axios(config)
    .then((response) => {
      message.success("profile updated successfully");
      dispatch(fetchUserProfile());
    })
    .catch((response) => {
      message.success("error updating profile");
    });
};
export default dashboardSlice.reducer;
