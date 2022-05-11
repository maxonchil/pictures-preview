import { TestBed } from '@angular/core/testing';

import { PicturesDomainService } from './pictures-domain.service';
import { FavoritePicturesStoreService, Picture, PicturesAdapter, PicturesApiService, PictureStoreService } from '@services/pictures';
import { of } from 'rxjs';
import { LocalStorageService } from '@services/local-storage';
import { take } from 'rxjs/operators';
import { getRandomDelay } from '@shared/utils';
import * as Utils from '@shared//utils'

describe('PicturesDomainService', () => {
    let service: PicturesDomainService;
    const picturesApiService = {
        getList$: () => of([favoritePicture]),
    };
    const pictureStoreService = {
        startNext: jest.fn(),
        update: (patch) => {},
        getLoadedState$: () => of(false),
        get$: () => of({ [notFavoritePicture.id]: notFavoritePicture }),
    };
    const favoritePictureStoreService = {
        removeFromFavorites: (patch) => {},
        addToFavorites: (patch) => {},
        get$: () => of({ [favoritePicture.id]: favoritePicture }),
        loadFavorites: () => undefined,
        getLoadedState$: () => of(true),
    };
    const favoritePicture = {
        isFavorite: true,
        id: 'first',
        url: 'string',
    };

    const notFavoritePicture = {
        isFavorite: false,
        id: 'first',
        url: 'string',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PicturesAdapter,
                LocalStorageService,
                { provide: PicturesApiService, useValue: picturesApiService },
                { provide: PictureStoreService, useValue: pictureStoreService },
                { provide: FavoritePicturesStoreService, useValue: favoritePictureStoreService },
            ],
        });
    });

    beforeEach(() => {
        service = TestBed.inject(PicturesDomainService);
    })


    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('loadPictures', () => {
        it('should loadFavorites', () => {
            const loadSpy = jest.spyOn(favoritePictureStoreService, 'loadFavorites');
            service.loadPictures();
            expect(loadSpy).toBeCalledWith();
        });
        it('should call startNext', () => {
            const loadSpy = jest.spyOn(pictureStoreService, 'startNext');
            service.loadPictures();
            expect(loadSpy).toBeCalledWith();
        });
    });

    describe('getListByPage$', () => {
        it('should call "getList$"', () => {
            const getListSpy = jest.spyOn(picturesApiService, 'getList$');

            service.getListByPage$(1).pipe(
                take(1),
            ).subscribe(() => expect(getListSpy).toBeCalledWith(1));
        });

        it('should call "get$" for favorites pictures', () => {
            const getListSpy = jest.spyOn(favoritePictureStoreService, 'get$');

            service.getListByPage$(1).pipe(
                take(1),
            ).subscribe(() => expect(getListSpy).toBeCalled());
        });

        it('should set random delay', () => {
            const randomDelaySpy = jest.spyOn(Utils, 'getRandomDelay');

            service.getListByPage$(1).pipe(
                take(1),
            ).subscribe(() => expect(randomDelaySpy).toBeCalled());
        });

        it('should return empty array if error received', () => {
            service.getListByPage$(1).pipe(
                take(1),
            ).subscribe((res) => expect(res).toBe([]));
        });
    });

    describe('#toggleFavorite', () => {
        it('should call "remove" method if picture is favorite', () => {
            const removeSpy = jest.spyOn(favoritePictureStoreService, 'removeFromFavorites');
            service.toggleFavorite(favoritePicture);
            expect(removeSpy).toHaveBeenCalledWith(favoritePicture);
        });

        it('should call "add" method if picture is not favorite', () => {
            const removeSpy = jest.spyOn(favoritePictureStoreService, 'addToFavorites');
            service.toggleFavorite(notFavoritePicture);
            expect(removeSpy).toHaveBeenCalledWith(notFavoritePicture);
        });

        it('should call method update with patch', () => {
            const updateSpy = jest.spyOn(pictureStoreService, 'update');
            const patch = {
                id: notFavoritePicture.id,
                patch: {
                    isFavorite: true,
                },
            };
            service.toggleFavorite(notFavoritePicture);
            expect(updateSpy).toHaveBeenCalledWith(patch);
        });
    });

    describe('#getPicturesArray$', () => {
        it('should call "get$"', () => {
            const getSpy = jest.spyOn(pictureStoreService, 'get$');

            service.getPicturesArray$().pipe(
                take(1),
            ).subscribe(() => expect(getSpy).toBeCalledWith());
        });

        it('should call "getLoadedState$" ', () => {
            const loadedStateSpy = jest.spyOn(pictureStoreService, 'getLoadedState$');

            service.getPicturesArray$().pipe(
                take(1),
            ).subscribe(() => expect(loadedStateSpy).toBeCalled());
        });

        it('should call "loadPictures" if "loaded" false', () => {
            const loadSpy = jest.spyOn(service, 'loadPictures');

            service.getPicturesArray$().pipe(
                take(1),
            ).subscribe(() => expect(loadSpy).toBeCalled());
        });

        it('should return empty array if error received', () => {
            service.getPicturesArray$().pipe(
                take(1),
            ).subscribe((res) => expect(res).toBe([]));
        });
    });

    describe('#getFavorites', () => {
        it('should call "get$"', () => {
            const getSpy = jest.spyOn(favoritePictureStoreService, 'get$');

            service.getFavorites$().pipe(
                take(1),
            ).subscribe(() => expect(getSpy).toBeCalledWith());
        });

        it('should call "getLoadedState$" ', () => {
            const loadedStateSpy = jest.spyOn(favoritePictureStoreService, 'getLoadedState$');

            service.getFavorites$().pipe(
                take(1),
            ).subscribe(() => expect(loadedStateSpy).toBeCalled());
        });

        it('should not call "loadFavorites" if "loaded" false', () => {
            const loadSpy = jest.spyOn(favoritePictureStoreService, 'loadFavorites');

            service.getFavorites$().pipe(
                take(1),
            ).subscribe(() => expect(loadSpy).toHaveBeenCalledTimes(0));
        });

        it('should set random delay', () => {
            const randomDelaySpy = jest.spyOn(Utils, 'getRandomDelay');

            service.getFavorites$().pipe(
                take(1),
            ).subscribe(() => expect(randomDelaySpy).toBeCalled());
        });

        it('should return empty object if error received', () => {
            service.getFavorites$().pipe(
                take(1),
            ).subscribe((res) => expect(res).toBe({}));
        });
    });

    describe('#getFavoriteById$', () => {
        it('should call "getFavorites$"', () => {
            const getFavoritesSpy = jest.spyOn(service, 'getFavorites$');

            service.getFavoriteById$('first').pipe(
                take(1),
            ).subscribe(() => expect(getFavoritesSpy).toHaveBeenCalled());
        });

        it('should return favorite picture by id', () => {
            service.getFavoriteById$('first').pipe(
                take(1),
            ).subscribe((picture: Picture) => expect(picture).toEqual(favoritePicture));
        });

        it('should return undefined, if no picture with such id', () => {
            service.getFavoriteById$('first').pipe(
                take(1),
            ).subscribe((picture: Picture) => expect(picture).toEqual(undefined));
        });
    });
});
