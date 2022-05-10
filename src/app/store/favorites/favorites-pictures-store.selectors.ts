import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritePicturesStore } from './favorites-pictures-store.types';

export const getFavoritePicturesStore = createFeatureSelector<FavoritePicturesStore>('favoritesPictures');

export const getFavoritesPicturesIds = createSelector(getFavoritePicturesStore, ({ favorites }) => favorites);
