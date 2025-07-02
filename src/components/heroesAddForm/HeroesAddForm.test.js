import { render, screen, fireEvent } from '@testing-library/react';
import HeroesAddForm from './HeroesAddForm';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../heroesList/heroesSlice';
import filtersReducer from '../heroesFilters/heroesFiltersSlice';

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: {
      heroes: heroesReducer,
      filters: filtersReducer,
    },
    preloadedState
  });

  return render(
    <Provider store={store}>
      <HeroesAddForm />
    </Provider>
  );
};

describe('HeroesAddForm', () => {
  test('рендерится без ошибок', () => {
    renderWithStore({
      heroes: {
        ids: [],
        entities: {},
        heroesLoadingStatus: 'idle',
      },
      filters: {
        ids: ['fire', 'water'],
        entities: {
          fire: { name: 'fire', label: 'Огонь' },
          water: { name: 'water', label: 'Вода' }
        },
        filtersLoadingStatus: 'idle',
      }
    });

    expect(screen.getByText(/Имя нового героя/i)).toBeInTheDocument();
    expect(screen.getByText(/Выбрать элемент героя/i)).toBeInTheDocument();
  });

  test('показывает ошибку при пустом сабмите', async () => {
    renderWithStore({
      heroes: {
        ids: [],
        entities: {},
        heroesLoadingStatus: 'idle',
      },
      filters: {
        ids: ['fire'],
        entities: {
          fire: { name: 'fire', label: 'Огонь' }
        },
        filtersLoadingStatus: 'idle',
      }
    });

    fireEvent.click(screen.getByText(/Создать/i));

    expect(await screen.findByText(/Введите имя!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Введите описание!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Выберете элемент!/i)).toBeInTheDocument();
  });
});