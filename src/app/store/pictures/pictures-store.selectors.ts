import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PicturesStore } from './pictures-store.types';

export const getPicturesState = createFeatureSelector<PicturesStore>('pictures');

export const getPicturesPageInfo = createSelector(getPicturesState, ({ pageInfo }) => pageInfo);
export const getPictures = createSelector(getPicturesState, ({ pictures }) => pictures);
export const getLoadingState = createSelector(getPicturesState, ({ isLoading }) => isLoading);
export const getLoadedState = createSelector(getPicturesState, ({ loaded }) => loaded);
