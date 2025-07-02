import reducer, {
  heroCreated,
  deleteItem,
  fetchHeroes,
  selectAll
} from '../heroesList/heroesSlice';  // поправь путь под себя

describe('heroesSlice', () => {
  const initialState = {
    ids: [],
    entities: {},
    heroesLoadingStatus: 'idle',
  };

  it('должен возвращать initial state при неизвестном действии', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('добавляет героя через heroCreated', () => {
    const hero = { id: '1', name: 'Spider-Man' };
    const actual = reducer(initialState, heroCreated(hero));
    expect(actual.ids).toContain('1');
    expect(actual.entities['1']).toEqual(hero);
  });

  it('удаляет героя через deleteItem', () => {
    const startState = {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1', name: 'Spider-Man' },
        '2': { id: '2', name: 'Iron Man' }
      },
      heroesLoadingStatus: 'idle',
    };
    const actual = reducer(startState, deleteItem('1'));
    expect(actual.ids).not.toContain('1');
    expect(actual.entities['1']).toBeUndefined();
  });

  // Тесты для asyncThunk fetchHeroes

  it('fetchHeroes.pending изменяет статус на loading', () => {
    const action = { type: fetchHeroes.pending.type };
    const state = reducer(initialState, action);
    expect(state.heroesLoadingStatus).toBe('loading');
  });

  it('fetchHeroes.fulfilled загружает героев и меняет статус на idle', () => {
    const heroes = [
      { id: '1', name: 'Spider-Man' },
      { id: '2', name: 'Iron Man' }
    ];
    const action = { type: fetchHeroes.fulfilled.type, payload: heroes };
    const state = reducer(initialState, action);
    expect(state.heroesLoadingStatus).toBe('idle');
    expect(state.ids).toEqual(['1', '2']);
    expect(state.entities['1'].name).toBe('Spider-Man');
  });

  it('fetchHeroes.rejected изменяет статус на error', () => {
    const action = { type: fetchHeroes.rejected.type };
    const state = reducer(initialState, action);
    expect(state.heroesLoadingStatus).toBe('error');
  });

  it('selectAll возвращает массив всех героев из состояния', () => {
  const state = {
    heroes: {
      ids: ['1', '2'],
      entities: {
        '1': { id: '1', name: 'Spider-Man' },
        '2': { id: '2', name: 'Iron Man' }
      },
      heroesLoadingStatus: 'idle',
    }
  };

    const allHeroes = selectAll(state);
    expect(allHeroes.length).toBe(2);
    expect(allHeroes).toEqual([
        { id: '1', name: 'Spider-Man' },
        { id: '2', name: 'Iron Man' }
    ]);
    });
});