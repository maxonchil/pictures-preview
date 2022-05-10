import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { loadFavorites, loadFavoritesError, loadFavoritesSuccess } from './favorites-pictures-store.actions';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { LocalStorageKeys } from '../../services/local-storage/local-storage.types';

@Injectable()
export class FavoritesPicturesEffects {
    constructor(
        private actions$: Actions,
        private localStorageService: LocalStorageService,
    ) {}

    loadFavorites$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFavorites),
            map(() => {
                const favorites = JSON.parse(this.localStorageService.get(LocalStorageKeys.Favorites) ?? '[]');
                return loadFavoritesSuccess({ favorites });
            }),
            catchError((error: HttpErrorResponse) => {
                return of(loadFavoritesError({ error: error.message }));
            }),
        ));
}
