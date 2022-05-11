import { TestBed } from '@angular/core/testing';

import { PhotoItemGuard } from './photo-item.guard';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { PicturesDomainService } from '@services/pictures';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

describe('PhotoItemGuard', () => {
    let guard: PhotoItemGuard;
    let useNotFavoritePicture = false;
    let useUndefinedInsteadOfPicture = false;
    let useErrorInsteadOfPicture = false;
    const router = {
        params: { id: 'pictureId' },
    } as unknown as ActivatedRouteSnapshot;

    const mockedRouter = {
        navigate: jest.fn(),
    };
    const mockedFavoritePicture = {
        id: 'pictureId',
        isFavorite: true,
        url: '',
    };
    const mockedNotFavoritePicture = {
        id: 'pictureId',
        isFavorite: true,
        url: '',
    };

    const picturesDomainService = {
        getFavoriteById$: () => {
            if (useErrorInsteadOfPicture) return of(new Error());
            if (useUndefinedInsteadOfPicture) {
                useErrorInsteadOfPicture = true;
                return of(undefined);
            }
            if (useNotFavoritePicture) {
                useUndefinedInsteadOfPicture = true;
                return of(mockedNotFavoritePicture);
            }
            useNotFavoritePicture = true;
            return of(mockedFavoritePicture);
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PhotoItemGuard,
                { provide: Router, useValue: mockedRouter },
                { provide: PicturesDomainService, useValue: picturesDomainService },
            ],
        });
        guard = TestBed.inject(PhotoItemGuard);
    });

    it('should return true if received picture is favorite', () => {
        guard.canActivate(router).pipe(
            take(1),
        ).subscribe((res) => expect(res).toBeTruthy())
    });

    it('should return false if received picture is not favorite', () => {
        guard.canActivate(router).pipe(
            take(1),
        ).subscribe((res) => expect(res).toBeFalsy())
    });

    it('should return false if received picture is not favorite', () => {
        guard.canActivate(router).pipe(
            take(1),
        ).subscribe((res) => expect(res).toBeFalsy())
    });

    it('should be falsy, if picture is undeifned', () => {
        guard.canActivate(router).pipe(
            take(1),
        ).subscribe((res) => expect(res).toBeFalsy())
    });

    it('should navigate to "not found" if error received', () => {
        const routerSpy = jest.spyOn(mockedRouter, 'navigate')
        guard.canActivate(router).pipe(
            take(1),
        ).subscribe((res) => expect(routerSpy).toBeCalledWith(['/not-found']))
    });
});
