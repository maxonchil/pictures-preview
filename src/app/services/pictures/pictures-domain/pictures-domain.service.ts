import { Injectable } from '@angular/core';
import { map, Observable, withLatestFrom } from 'rxjs';
import { Picture, PictureDto } from '../pictures.types';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { FavoritePicturesStoreService } from '../favorite-pictures-store/favorite-pictures-store.service';
import { PicturesApiService } from '../pictures-api';
import { PicturesAdapter } from '../pictures-adapter/pictures.adapter';
import { PictureStoreService } from '../pictures-store-service/picture-store.service';

@Injectable({
    providedIn: 'root',
})
export class PicturesDomainService {
    pictures: Picture[] = [];

    constructor(
        private picturesApiService: PicturesApiService,
        private adapter: PicturesAdapter,
        private localStorageService: LocalStorageService,
        private picturesStoreService: PictureStoreService,
        private favoritePicturesStoreService: FavoritePicturesStoreService,
    ) { }

    loadPictures(): void {
        this.favoritePicturesStoreService.loadFavorites();
        this.picturesStoreService.startNext();
    }

    getListByPage$(page: number, limit?: number): Observable<Picture[]> {

        return this.picturesApiService.getList$(page, limit).pipe(
            withLatestFrom(this.favoritePicturesStoreService.getFavorites$()),
            map(([pictures, favoritesIds]: [PictureDto[], string[]]) => this.adapter.forward(pictures, favoritesIds)),
        );
    }

    toggleFavorite({ id: toggleId, isFavorite }: Picture) {
        // const favoritesIds = this.getFavoritesIds();
        // const updateFavoritesIds = isFavorite
        //     ? favoritesIds.filter((id: string) => id !== toggleId)
        //     : [...favoritesIds, toggleId];
        //
        // this.localStorageService.set(LocalStorageKeys.Favorites, JSON.stringify(updateFavoritesIds));
    }

}
