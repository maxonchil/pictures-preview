import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, withLatestFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {
    addToFavorites,
    addToFavoritesError,
    addToFavoritesSuccess,
    loadFavorites,
    loadFavoritesError,
    loadFavoritesSuccess,
    removeFromFavorites,
    removeFromFavoritesError,
    removeFromFavoritesSuccess,
} from './favorites-pictures-store.actions';
import { LocalStorageKeys, LocalStorageService } from '@services/local-storage';
import { FavoritePicturesStoreService, Picture } from '@services/pictures';
import { ToggleFavoritePayload } from '@store/favorites/favorites-pictures-store.types';

@Injectable()
export class FavoritesPicturesEffects {
    constructor(
        private actions$: Actions,
        private localStorageService: LocalStorageService,
        private favoritesPictureStoreService: FavoritePicturesStoreService,
    ) {}

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFavorites),
            map(() => {
                const favorites = JSON.parse(this.localStorageService.get(LocalStorageKeys.Favorites) ?? '[]');
                return loadFavoritesSuccess({ favorites });
            }),
            catchError((error: HttpErrorResponse) => of(loadFavoritesError({ error: error.message }))),
        ));

    addToFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addToFavorites),
            withLatestFrom(this.favoritesPictureStoreService.get$()),
            map(([{ picture }, favorites]: [ToggleFavoritePayload, Record<string, Picture>]) => {
                const updateFavorites: Record<string, Picture> = { ...favorites, [picture.id]: { ...picture, isFavorite: true } };
                this.localStorageService.set(LocalStorageKeys.Favorites, JSON.stringify(updateFavorites));
                return addToFavoritesSuccess({ updateFavorites });
            }),
            catchError((error) => of(addToFavoritesError(error.message))),
        ),
    );

    removeFromFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeFromFavorites),
            withLatestFrom(this.favoritesPictureStoreService.get$()),
            map(([{ picture }, favorites]: [ToggleFavoritePayload, Record<string, Picture>]) => {
                const { [picture.id]: pictureToRemove, ...updateFavorites } = favorites;
                this.localStorageService.set(LocalStorageKeys.Favorites, JSON.stringify(updateFavorites));
                return removeFromFavoritesSuccess({ updateFavorites });
            }),
            catchError((error) => of(removeFromFavoritesError(error.message))),
        ),
    );
}
