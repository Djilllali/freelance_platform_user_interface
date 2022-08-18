import axios from "axios";
import { signInUrl } from "../constants";

const { createSlice } = require("@reduxjs/toolkit");
const loginReducer = createSlice({
  name: "login",
  initialState: {
    loginResult: null,
    loginError: null,
    isLogging: false,
    token: "",
  },
  reducers: {
    setLoginResult: (state, action) => {
      state.loginResult = action.payload;
      state.loginError = null;
      state.token = action.payload.data.token;
      state.isLogging = false;
    },
    setLoginError: (state, action) => {
      state.loginResult = null;
      state.loginError = action.payload;
      state.isLogging = false;
    },

    setIsLogging: (state, action) => {
      state.isLogging = action.payload;
    },
    cleanupLogin: (state, action) => {
      state.loginResult = null;
      state.loginError = null;
      state.isLogging = false;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

export const {
  cleanupLogin,
  setIsLogging,
  setLoginError,
  setLoginResult,
  logout,
} = loginReducer.actions;
export const fetchSignin = (data) => async (dispatch, getState) => {
  let config = {
    method: "post",
    url: signInUrl,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  console.log("-------signin url", signInUrl);
  console.log("-------data", data);
  dispatch(setIsLogging(true));
  axios(config)
    .then((res) => {
      localStorage.setItem("token", res.data.data.token);
      dispatch(setLoginResult(res.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(setLoginError(error.response.data));
    });
};
export default loginReducer.reducer;
