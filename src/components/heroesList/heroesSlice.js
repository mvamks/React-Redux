import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})


/* const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle', // статус загрузки героев: idle, loading, error
} */


export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            heroesAdapter.addOne(state, action.payload); // 👍 добавить одного героя
        },
        deleteItem: (state, action) => {
            heroesAdapter.removeOne(state, action.payload); // 👍 удалить по id
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state=> {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                heroesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;
export default reducer;

export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    deleteItem
} = actions;



