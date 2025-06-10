const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle', // статус загрузки героев: idle, loading, error
    filters: [], // список фильтров
    filtersLoadingStatus: 'idle', // статус загрузки фильтров
    activeFilter: 'all'  // текущий выбранный фильтр (показывать всех)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETE_ITEM': {
            const updatedHeroes = state.heroes.filter(hero => hero.id !== action.payload);
            return {
                ...state,
                heroes: updatedHeroes
            }
        }

        case 'HERO_CREATED': {
            return {
                ...state,
                heroes: [action.payload, ...state.heroes]  // добавляем нового героя в массив
            };
        }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            };
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload
            };

        default: return state;
    }
}

export default reducer;