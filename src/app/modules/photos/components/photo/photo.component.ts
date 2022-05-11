import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, Subject, takeUntil } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FavoritePicturesStoreService, Picture, PicturesDomainService } from '@services/pictures';
import { StoreNotifierService } from '@services/store-notifier';
import { FavoritePicturesTypes } from '@store/favorites';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent implements OnInit, OnDestroy {
    picture!: Picture;
    isLoading: boolean = true;
    private notifier$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private picturesDomainService: PicturesDomainService,
        private favoritesPicturesStoreService: FavoritePicturesStoreService,
        private storeNotifierService: StoreNotifierService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.favoritesPicturesStoreService.getLoadingState$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((isLoading: boolean) => this.isLoading = isLoading);

        this.route.params.pipe(
            pluck('id'),
            switchMap((id: string) => this.picturesDomainService.getFavoriteById$(id)),
            takeUntil(this.notifier$),
        ).subscribe((picture: Picture) => {
            this.picture = picture;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    removeFromFavorites(picture: Picture): void {
        this.storeNotifierService.notify$(FavoritePicturesTypes.RemoveFavoritesSuccess, FavoritePicturesTypes.RemoveFavoritesError).pipe(
            take(1),
        ).subscribe(() => this.router.navigate(['/favorites']));

        this.picturesDomainService.toggleFavorite(picture);
    }
}
