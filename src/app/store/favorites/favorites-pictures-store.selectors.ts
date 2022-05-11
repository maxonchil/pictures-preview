import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritePicturesStore } from './favorites-pictures-store.types';

export const getFavoritePicturesStore = createFeatureSelector<FavoritePicturesStore>('favoritesPictures');

export const getFavoritesPictures = createSelector(getFavoritePicturesStore, ({ favorites }) => favorites);
export const getLoadedState = createSelector(getFavoritePicturesStore, ({ loaded }) => loaded);
export const getLoadingState = createSelector(getFavoritePicturesStore, ({ isLoading }) => isLoading);
