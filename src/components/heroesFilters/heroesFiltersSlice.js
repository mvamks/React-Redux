import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';


const filterHeroesAdapter = createEntityAdapter();

const initialState = filterHeroesAdapter.getInitialState({
    filtersLoadingStatus: 'idle', // статус загрузки фильтров
    activeFilter: 'all'  // текущий выбранный фильтр (показывать всех)
});


/* const initialState = {
    filters: [], // список фильтров
    filtersLoadingStatus: 'idle', // статус загрузки фильтров
    activeFilter: 'all'  // текущий выбранный фильтр (показывать всех)
} */

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const {request} = useHttp();
        return await request("/filters");
    }
)


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus ='idle';
                filterHeroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;
export default reducer;

export const {selectAll: selectAllFilters} = filterHeroesAdapter.getSelectors(state => state.filters);
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;

