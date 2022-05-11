import { Injectable } from '@angular/core';
import { catchError, delay, filter, map, Observable, of, withLatestFrom } from 'rxjs';
import { Picture, PictureDto } from '../pictures.types';
import { LocalStorageService } from '@services/local-storage';
import { PicturesApiService } from '../pictures-api';
import { FavoritePicturesStoreService, PicturesAdapter, PictureStoreService } from '@services/pictures';
import { getRandomDelay } from '@shared/utils';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PicturesDomainService {
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
            withLatestFrom(this.favoritePicturesStoreService.get$()),
            map(([pictures, favoritesMap]: [PictureDto[], Record<string, Picture>]) => this.adapter.forward(pictures, favoritesMap)),
            delay(getRandomDelay()),
            catchError((error: HttpErrorResponse) => {
                console.error(error.message);
                return of([]);
            }),
        );
    }

    toggleFavorite(picture: Picture): void {
        if (picture.isFavorite) {
            this.favoritePicturesStoreService.removeFromFavorites(picture);
        } else {
            this.favoritePicturesStoreService.addToFavorites(picture);
        }

        const patch = {
            id: picture.id,
            patch: { isFavorite: !picture.isFavorite },
        };
        this.picturesStoreService.update(patch);
    }

    addToFavorite(picture: Picture): void {
        this.favoritePicturesStoreService.addToFavorites(picture);

        const { id, isFavorite } = picture;
        const patch = { isFavorite: !isFavorite };
        this.picturesStoreService.update({ id, patch });
    }

    getPicturesArray$(): Observable<Picture[]> {
        return this.picturesStoreService.get$().pipe(
            withLatestFrom(this.picturesStoreService.getLoadedState$()),
            switchMap(([picturesMap, isLoaded]: [Record<string, Picture>, boolean]) => {
                if (isLoaded) return of(picturesMap);
                this.loadPictures();
                return of({} as Record<string, Picture>);
            }),
            filter((value: Record<string, Picture>) => !!Object.keys(value).length),
            map((picturesMap: Record<string, Picture>) => Object.values(picturesMap)),
            catchError((error: HttpErrorResponse) => {
                console.error(error.message);
                return of([]);
            }),
        );
    }

    getFavorites$(): Observable<Record<string, Picture> | null> {
        return this.favoritePicturesStoreService.get$().pipe(
            withLatestFrom(this.favoritePicturesStoreService.getLoadedState$()),
            switchMap(([favoritesMap, isLoaded]: [Record<string, Picture>, boolean]) => {
                if (isLoaded) return of(favoritesMap);
                this.favoritePicturesStoreService.loadFavorites();
                return of(null);
            }),
            filter((value: Record<string, Picture> | null) => value !== null),
            delay<Record<string, Picture> | null>(getRandomDelay()),
            catchError((error: HttpErrorResponse) => {
                console.error(error.message);
                return of({} as Record<string, Picture>);
            }),
        );
    }

    getFavoriteById$(id: string): Observable<Picture> {
        return this.getFavorites$().pipe(
            map((favorites: Record<string, Picture> | null) => (favorites as Record<string, Picture>)[id]),
        );
    }
}
