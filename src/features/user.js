import { createSlice } from "@reduxjs/toolkit";

let initialState;

if (localStorage.getItem("user")) {
  initialState = JSON.parse(localStorage.getItem("user"));
} else {
  initialState = { name: "", id: "", token: "" };
}

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = { name: "", id: "", token: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
