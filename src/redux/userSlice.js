import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: [],
    selectedUser: null,
    onlineUsers: null,
    filteredUser: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setFilteredUser: (state, action) => {
      state.filteredUser = action.payload || [];
    },
  },
});

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, setFilteredUser } = userSlice.actions;
export default userSlice.reducer;
