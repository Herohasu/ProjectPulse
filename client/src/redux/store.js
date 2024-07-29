// import { configureStore } from '@reduxjs/toolkit';
// import AuthSlice from './AuthSlice';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, AuthSlice);

// export const store = configureStore({
//   reducer: {
//     Auth: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);

// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './AuthSlice';
import notificationReducer from './NotificationSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
  reducer: {
    Auth: persistedReducer,
    notifications: notificationReducer,
  },
});

export const persistor = persistStore(store);
