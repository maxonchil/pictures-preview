import { createAction, props } from '@ngrx/store';
import {
    FavoritePicturesTypes,
    FavoritesErrorPayload,
    LoadFavoritesSuccessPayload,
    ToggleFavoritePayload,
    ToggleFavoritesSuccessPayload,
} from './favorites-pictures-store.types';

export const loadFavorites = createAction(FavoritePicturesTypes.LoadFavorites);
export const loadFavoritesSuccess = createAction(FavoritePicturesTypes.LoadFavoritesSuccess, props<LoadFavoritesSuccessPayload>());
export const loadFavoritesError = createAction(FavoritePicturesTypes.LoadFavoritesError, props<FavoritesErrorPayload>());

export const addToFavorites = createAction(FavoritePicturesTypes.AddToFavorites, props<ToggleFavoritePayload>());
export const addToFavoritesSuccess = createAction(FavoritePicturesTypes.AddToFavoritesSuccess, props<ToggleFavoritesSuccessPayload>());
export const addToFavoritesError = createAction(FavoritePicturesTypes.AddToFavoritesError, props<FavoritesErrorPayload>());

export const removeFromFavorites = createAction(FavoritePicturesTypes.RemoveFavorites, props<ToggleFavoritePayload>());
export const removeFromFavoritesSuccess = createAction(FavoritePicturesTypes.RemoveFavoritesSuccess, props<ToggleFavoritesSuccessPayload>());
export const removeFromFavoritesError = createAction(FavoritePicturesTypes.RemoveFavoritesError, props<FavoritesErrorPayload>());
