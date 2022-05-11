import { createReducer, on } from '@ngrx/store';
import {
    addToFavoritesError,
    addToFavoritesSuccess,
    loadFavoritesError,
    loadFavoritesSuccess,
    removeFromFavoritesError,
    removeFromFavoritesSuccess,
} from './favorites-pictures-store.actions';
import { Picture } from '@services/pictures';

const initialState = {
    favorites: {} as Record<string, Picture>,
    loaded: false,
    isLoading: false,
    error: '',
};

export const favoritesReducer = createReducer(
    initialState,
    on(loadFavoritesSuccess, (state, { favorites }) => ({
        ...state,
        favorites: { ...state.favorites, ...favorites },
        loaded: true,
        isLoading: false,
    })),
    on(addToFavoritesSuccess, removeFromFavoritesSuccess, (state, { updateFavorites }) => ({ ...state, favorites: updateFavorites })),
    on(loadFavoritesError, addToFavoritesError, removeFromFavoritesError, (state, { error }) => ({ ...state, error })),
);
