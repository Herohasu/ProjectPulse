import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post } from '../services/ApiEndpoint';

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {
  const response = await get('/api/notifications');
  return response.data.notifications;
});

export const addNotification = createAsyncThunk('notifications/addNotification', async (notification) => {
  const response = await post('/api/notifications/add', notification);
  return response.data.message;
});

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNotification.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notificationSlice.reducer;
