import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchWithdrawalRequestsUrl } from "../constants";

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
    method: "get",
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
export default WithdrawalRequestsSlice.reducer;
