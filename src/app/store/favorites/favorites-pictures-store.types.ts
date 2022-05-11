import { Picture } from '@services/pictures';

export interface FavoritePicturesStore {
    favorites: Record<string, Picture>,
    loaded: boolean,
    isLoading: boolean,
    error: string,
}

export interface ToggleFavoritePayload {
    picture: Picture,
}

export interface ToggleFavoritesSuccessPayload {
    updateFavorites: Record<string, Picture>,
}

export type LoadFavoritesSuccessPayload = Pick<FavoritePicturesStore, 'favorites'>

export type FavoritesErrorPayload = Pick<FavoritePicturesStore, 'error'>

export enum FavoritePicturesTypes {
    LoadFavorites = '[Favorites Pictures] Load Favorites',
    LoadFavoritesSuccess = '[Favorites Pictures] Load Favorites Success',
    LoadFavoritesError = '[Favorites Pictures] Load Favorites Error',
    AddToFavorites = '[Favorites Pictures] Add To Favorites',
    AddToFavoritesSuccess = '[Favorites Pictures] Add To Favorites Success',
    AddToFavoritesError = '[Favorites Pictures] Add To Favorites Error',
    RemoveFavorites = '[Favorites Pictures] Remove from favorites',
    RemoveFavoritesSuccess = '[Favorites Pictures] Remove from favorites Success',
    RemoveFavoritesError = '[Favorites Pictures] Remove from favorites Error',
}
