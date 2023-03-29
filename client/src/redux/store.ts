import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import initialState from './initialState';

export const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
});