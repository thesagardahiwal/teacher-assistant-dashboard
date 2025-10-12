import { createSlice } from "@reduxjs/toolkit";
import { loginTeacher, registerTeacher, verifyTeacher } from "./authThunks";
import { AuthState } from "./types";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    },
    entry: (state, action) => {
        state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.teacher || null;
      })
      .addCase(loginTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(registerTeacher.fulfilled, (state, action) => {
        state.user = action.payload?.teacher || null;
      })
      .addCase(verifyTeacher.fulfilled, (state, action) => {
        state.user = action.payload?.teacher || null;
      });
  },
});

export const { logout, entry } = authSlice.actions;
export default authSlice.reducer;
