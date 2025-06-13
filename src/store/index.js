//import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//import reducer from '../reducers';
import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/heroesFiltersSlice';
//import filters from '../reducers/filters';
//import { getDefaultNormalizer } from '@testing-library/react';

/* const rootReducer = combineReducers({heroes, filters}); */

// Кастомный enhancer, добавляющий возможность dispatch'ить строки
/* const stringMiddlewareEnhancer  = (createStore) => (...arg) => {
    const store = createStore(...arg);

    const oldDispatch = store.dispatch;
    store.dispatch = (action) => {
        if(typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store;
}; */

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};


/* const store = configureStore({
    reducer: rootReducer, 
    enhancer: [stringMiddlewareEnhancer], // наш кастомный enhancer
    devTools: process.env.NODE_ENV !== 'production' // автоматически подключает Redux DevTools
 }); */

const store = configureStore({
    reducer: {heroes, filters},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production' // автоматически подключает Redux DevTools
})
     

export default store;