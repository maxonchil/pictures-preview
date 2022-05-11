import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Picture } from '../pictures.types';
import {
    getLoadedState,
    getLoadingState,
    getNextPicturesPage,
    getPictures,
    getPicturesPageInfo,
    PageInfo,
    PicturesStore,
    updatePicture,
} from '@store/pictures';

@Injectable({
    providedIn: 'root',
})
export class PictureStoreService {

    constructor(
        private store: Store<PicturesStore>,
    ) { }

    startNext(): void {
        this.store.dispatch(getNextPicturesPage());
    }

    update(payload: { id: string, patch: Partial<Picture> }): void {
        this.store.dispatch(updatePicture(payload));
    }

    getPageInfo$(): Observable<PageInfo> {
        return this.store.pipe(select(getPicturesPageInfo));
    }

    get$(): Observable<Record<string, Picture>> {
        return this.store.pipe(select(getPictures));
    }

    getLoadingState$(): Observable<boolean> {
        return this.store.pipe(select(getLoadingState));
    }

    getLoadedState$(): Observable<boolean> {
        return this.store.pipe(select(getLoadedState));
    }
}
