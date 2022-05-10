import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, take } from 'rxjs/operators';
import { Picture, PicturesDomainService } from '../../services/pictures';
import { catchError, map, of, withLatestFrom } from 'rxjs';
import { getNextPicturesPage, getNextPicturesPageError, getNextPicturesPageSuccess } from './pictures-store.actions';
import { PageInfo } from './pictures-store.types';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { PictureStoreService } from '../../services/pictures/pictures-store-service/picture-store.service';

@Injectable()
export class PicturesEffects {
    constructor(
        private actions$: Actions,
        private picturesStoreService: PictureStoreService,
        private picturesDomainService: PicturesDomainService,
    ) {}

    startList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getNextPicturesPage),
            withLatestFrom(this.picturesStoreService.getPageInfo$()),
            switchMap(([, pageInfo]: [Action, PageInfo]) => {
                return this.picturesDomainService.getListByPage$(pageInfo.nextPage).pipe(
                    take(1),
                    map((pictures: Picture[]) => {
                        const successData = {
                            pictures,
                            pageInfo: {
                                currentPage: pageInfo.nextPage,
                                nextPage: pageInfo.nextPage + 1,
                            },
                        };

                        return getNextPicturesPageSuccess(successData);
                    }),
                );
            }),
            catchError((error: HttpErrorResponse) => {
                return of(getNextPicturesPageError({ error: error.message }))
            }),
        ));
}
