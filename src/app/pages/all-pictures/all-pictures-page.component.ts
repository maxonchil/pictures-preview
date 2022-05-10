import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Picture, PicturesDomainService } from '../../services/pictures';
import { BehaviorSubject, filter, fromEvent, map, Subject, takeUntil, tap } from 'rxjs';
import { trackByProp } from '../../shared/utils/track-by-prop/track-by-prop.function';
import { PictureStoreService } from '../../services/pictures/pictures-store-service/picture-store.service';

@Component({
    selector: 'app-all-pictures-page',
    templateUrl: './all-pictures-page.component.html',
    styleUrls: ['./all-pictures-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPicturesPageComponent implements OnInit, AfterViewInit, OnDestroy {
    pictures: Picture[] = [];
    trackByProp = trackByProp;
    isLoading = true
    private notifier$ = new Subject<void>();
    private paginator$ = new BehaviorSubject<void>(undefined);

    get nativeElement(): HTMLElement {
        return this.elementRef?.nativeElement;
    }

    get isLoaderGlobal(): boolean {
        return !this.pictures.length
    }

    get yScrollLimit(): number {
        return this.nativeElement.scrollHeight - this.nativeElement.clientHeight;
    }

    @ViewChild('container') containerRef?: ElementRef;

    constructor(
        private picturesDomainService: PicturesDomainService,
        private picturesStoreService: PictureStoreService,
        private zone: NgZone,
        private cdr: ChangeDetectorRef,
        private elementRef: ElementRef,
    ) { }

    ngOnInit(): void {
        this.picturesStoreService.getPictures$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((pictures: Picture[]) => {
            if (!pictures.length) return this.picturesDomainService.loadPictures();
            console.log('pictures', pictures);
            this.pictures = pictures;
            this.cdr.detectChanges();
        });

        this.picturesStoreService.getLoadingState$().pipe(
            takeUntil(this.notifier$),
        ).subscribe((isLoading: boolean) => {
            this.isLoading = isLoading;
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        })
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            fromEvent(this.nativeElement, 'scroll').pipe(
                map(({ target }: Event) => (target as HTMLElement).scrollTop),
                filter((yScrollPosition: number) => yScrollPosition === this.yScrollLimit),
                takeUntil(this.notifier$),
            ).subscribe(() => this.picturesStoreService.startNext());
        })
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    onPictureClick(picture: Picture) {
        this.picturesDomainService.toggleFavorite(picture);
    }
}
