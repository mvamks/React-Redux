//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

const store = configureStore({
    reducer, 
    devTools: process.env.NODE_ENV !== 'production' // автоматически подключает Redux DevTools
});

export default store;