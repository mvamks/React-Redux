import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [], // список фильтров
    filtersLoadingStatus: 'idle', // статус загрузки фильтров
    activeFilter: 'all'  // текущий выбранный фильтр (показывать всех)
}


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus ='idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    }
});

const {actions, reducer} = filtersSlice;
export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;

