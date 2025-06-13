import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetching, filtersFetched, filtersFetchingError  } from '../components/heroesFilters/heroesFiltersSlice';

export const  fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => {
                console.log('Данные с сервера:', data); // <- добавь это
                dispatch(heroesFetched(data))
            })
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => {
                console.log("Фильтры с сервера:", data); 
                dispatch(filtersFetched(data));
            })
            .catch(() => dispatch(filtersFetchingError()));
}

/* export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const deleteItem = (id) => ({
    type: 'DELETE_ITEM',
    payload: id
});

export const heroCreated  = (hero) => ({
    type: 'HERO_CREATED',
    payload: hero
});
 */
/* export const filtersFetching = () => ({
    type: 'FILTERS_FETCHING'
});

export const filtersFetched = (filters) => ({
    type: 'FILTERS_FETCHED',
    payload: filters
});

export const filtersFetchingError = () => ({
    type: 'FILTERS_FETCHING_ERROR'
});

export const activeFilterChanged = (filter) => ({
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
}) */