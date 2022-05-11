import { Component, OnDestroy, OnInit } from '@angular/core';
import { Picture, PicturesDomainService, PictureStoreService } from '@services/pictures';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-all-pictures-page',
    templateUrl: './all-pictures-page.component.html',
})
export class AllPicturesPageComponent implements OnInit, OnDestroy {
    pictures: Picture[] = [];
    isLoading = true;
    private notifier$ = new Subject<void>();

    constructor(
        private picturesDomainService: PicturesDomainService,
        private picturesStoreService: PictureStoreService,
    ) { }

    ngOnInit(): void {
        this.picturesStoreService.getLoadingState$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((isLoading: boolean) => this.isLoading = isLoading);

        this.picturesDomainService.getPicturesArray$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((pictures: Picture[]) => this.pictures = pictures);
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    onPictureClick(picture: Picture): void {
        if (picture.isFavorite) return;

        this.picturesDomainService.addToFavorite(picture);
    }

    onScrollEnd(): void {
        this.picturesStoreService.startNext();
    }
}
