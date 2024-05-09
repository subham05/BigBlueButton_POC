import {configureStore} from '@reduxjs/toolkit';
import {postsApi} from '../api/api';

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;
