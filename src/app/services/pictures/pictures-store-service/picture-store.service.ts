import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PageInfo, PicturesStore } from '../../../store/pictures/pictures-store.types';
import { getLoadingState, getPictures, getPicturesPageInfo } from '../../../store/pictures/pictures-store.selectors';
import { Observable } from 'rxjs';
import { Picture } from '../pictures.types';
import { getNextPicturesPage } from '../../../store/pictures/pictures-store.actions';

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

    getPageInfo$(): Observable<PageInfo> {
        return this.store.pipe(select(getPicturesPageInfo));
    }

    getPictures$(): Observable<Picture[]> {
        return this.store.pipe(select(getPictures));
    }

    getLoadingState$(): Observable<boolean> {
        return this.store.pipe(select(getLoadingState));
    }
}
