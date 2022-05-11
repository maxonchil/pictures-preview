import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    addToFavorites,
    FavoritePicturesStore,
    getFavoritesPictures,
    getLoadedState,
    getLoadingState,
    loadFavorites,
    removeFromFavorites,
} from '@store/favorites';
import { Picture } from '@services/pictures';

@Injectable({
    providedIn: 'root',
})
export class FavoritePicturesStoreService {
    constructor(
        private store: Store<FavoritePicturesStore>,
    ) { }

    loadFavorites(): void {
        this.store.dispatch(loadFavorites());
    }

    addToFavorites(picture: Picture): void {
        this.store.dispatch(addToFavorites({ picture }));
    }

    removeFromFavorites(picture: Picture): void {
        this.store.dispatch(removeFromFavorites({ picture }));
    }

    get$(): Observable<Record<string, Picture>> {
        return this.store.pipe(select(getFavoritesPictures));
    }

    getLoadedState$(): Observable<boolean> {
        return this.store.pipe(select(getLoadedState));
    }

    getLoadingState$(): Observable<boolean> {
        return this.store.pipe(select(getLoadingState));
    }
}
