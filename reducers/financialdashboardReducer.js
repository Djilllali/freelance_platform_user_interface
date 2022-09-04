import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import {
  cancelWithdrawalRequestUrl,
  fetchWithdrawalRequestsUrl,
  createWithdrawalRequestUrl,
} from "../constants";

export const WithdrawalRequestsSlice = createSlice({
  name: "financialdashboard",
  initialState: {
    fetchWithdrawalRequestsResult: null,
    fetchWithdrawalRequestsError: null,
    isFetchingWithdrawalRequests: false,
    pathname: "/",
  },
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setfetchWithdrawalRequestsResult: (state, action) => {
      state.fetchWithdrawalRequestsResult = action.payload;
      state.fetchWithdrawalRequestsError = null;

      state.isFetchingWithdrawalRequests = false;
    },
    setfetchWithdrawalRequestsError: (state, action) => {
      state.fetchWithdrawalRequestsError = action.payload;
      state.fetchWithdrawalRequestsResult = null;

      state.isFetchingWithdrawalRequests = false;
    },
    setFetchingWithdrawalRequests: (state, action) => {
      state.isFetchingWithdrawalRequests = action.payload;
    },
  },
});

export const {
  setPathname,
  setfetchWithdrawalRequestsResult,
  setfetchWithdrawalRequestsError,
  setFetchingWithdrawalRequests,
} = WithdrawalRequestsSlice.actions;

export const fetchMyWithdrawalRequests = () => (dispatch, getState) => {
  const config = {
    method: "post",
    url: fetchWithdrawalRequestsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...");
  dispatch(setFetchingWithdrawalRequests(true));

  axios(config)
    .then((response) => {
      console.log("====== fetch WithdrawalRequests ", response.data);
      dispatch(setfetchWithdrawalRequestsResult(response.data));
    })
    .catch((response) => {
      dispatch(setfetchWithdrawalRequestsResult(response.message));
    });
};
export const cancelWithdrawalRequest = (id) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: `${cancelWithdrawalRequestUrl}${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  axios(config)
    .then((response) => {
      message.success(response.data.message);
      dispatch(fetchMyWithdrawalRequests());
    })
    .catch((response) => {
      message.error(response.message);
    });
};
export const createWithdrawalRequest = (data) => (dispatch, getState) => {
  console.log("------------------ create request data", data);
  const config = {
    method: "post",
    url: `${createWithdrawalRequestUrl}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data: data,
  };
  axios(config)
    .then((response) => {
      message.success(response.data.message);
      dispatch(fetchMyWithdrawalRequests());
    })
    .catch((response) => {
      message.error(response.message);
    });
};
export default WithdrawalRequestsSlice.reducer;
