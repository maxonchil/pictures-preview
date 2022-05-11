import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritePicturesStoreService, Picture, PicturesDomainService, PictureStoreService } from '@services/pictures';
import { map, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-favorites-picture-page',
    templateUrl: './favorites-picture-page.component.html',
})
export class FavoritesPicturePageComponent implements OnInit, OnDestroy {
    pictures!: Picture[];
    isLoading = true;
    private notifier$ = new Subject<void>();

    constructor(
        private picturesStoreService: PictureStoreService,
        private picturesDomainService: PicturesDomainService,
        private favoritesPicturesStoreService: FavoritePicturesStoreService,
        private router: Router,
    ) { }

    get isShowEmptyText(): boolean {
        return !!this.pictures && !this.pictures.length && !this.isLoading;
    }

    ngOnInit(): void {
        this.favoritesPicturesStoreService.getLoadingState$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((isLoading: boolean) => this.isLoading = isLoading);

        this.picturesDomainService.getFavorites$().pipe(
            map((favoritesMap: Record<string, Picture> | null) => Object.values(favoritesMap as Record<string, Picture>)),
            takeUntil(this.notifier$),
        ).subscribe((pictures: Picture[]) => this.pictures = pictures);
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    onPictureClick({ id }: Picture): void {
        this.router.navigate(['/photos', id]);
    }
}
