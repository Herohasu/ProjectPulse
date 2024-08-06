import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../services/ApiEndpoint";
import { useNavigate } from "react-router-dom";
export const updateUser = createAsyncThunk('auth/updateUser', async () => {
  try {
    const request = await get('/api/auth/checkuser');
    const response = request.data;
    return response.user;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  loading: null,
  error: null,
  user: null
};

const AuthSlice = createSlice({
  name: "authslice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
      state.loading = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = null;
      state.user = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = null;
      state.error = action.error.message;
      state.user = null;
    });
  }
});

export const { setUser, Logout } = AuthSlice.actions;

export default AuthSlice.reducer;
