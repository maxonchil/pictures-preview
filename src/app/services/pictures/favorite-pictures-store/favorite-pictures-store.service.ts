import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FavoritePicturesStore } from '../../../store/favorites/favorites-pictures-store.types';
import { Observable } from 'rxjs';
import { getFavoritesPicturesIds } from '../../../store/favorites/favorites-pictures-store.selectors';
import { loadFavorites } from '../../../store/favorites/favorites-pictures-store.actions';

@Injectable({
    providedIn: 'root',
})
export class FavoritePicturesStoreService {
    constructor(
        private store: Store<FavoritePicturesStore>,
    ) { }

    getFavorites$(): Observable<string[]> {
        return this.store.pipe(select(getFavoritesPicturesIds))
    }

    loadFavorites(): void {
        this.store.dispatch(loadFavorites());
    }
}
