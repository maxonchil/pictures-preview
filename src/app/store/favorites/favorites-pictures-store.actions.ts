import { createAction, props } from '@ngrx/store';

export const loadFavorites = createAction('[Favorites Pictures] Load Favorites');
export const loadFavoritesSuccess = createAction('[Favorites Pictures] Load Favorites Success', props<{ favorites: string[] }>());
export const loadFavoritesError = createAction('[Favorites Pictures] Load Favorites Error', props<{ error: string }>());
export const toggleFavorite = createAction('[Favorites Pictures] Load Favorite Error');
export const toggleFavoriteSuccess = createAction('[Favorites Pictures] Toggle Favorite Success');
export const toggleFavoriteError = createAction('[Favorites Pictures] Toggle Favorite Error');
