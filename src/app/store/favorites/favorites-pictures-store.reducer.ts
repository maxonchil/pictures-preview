import { createReducer, on } from '@ngrx/store';
import { loadFavoritesError, loadFavoritesSuccess } from './favorites-pictures-store.actions';

const initialState = {
    favorites: [] as string[],
    error: '',
};

export const favoritesReducer = createReducer(
    initialState,
    on(loadFavoritesSuccess, (state, { favorites }) => ({ ...state, favorites: [...state.favorites, ...favorites], loaded: true })),
    on(loadFavoritesError, (state, { error }) => ({ ...state, error })),
);
