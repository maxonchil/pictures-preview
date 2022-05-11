import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Picture } from '@services/pictures';
import { trackByProp } from '@shared/utils';
import { filter, fromEvent, map, Subject, takeUntil } from 'rxjs';
import { DEFAULT_PAGE_SIZE } from '@services/api';

@Component({
    selector: 'app-pictures-list',
    templateUrl: './pictures-list.component.html',
    styleUrls: ['./pictures-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PicturesListComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() pictures!: Picture[];
    @Input() isLoading!: boolean;
    @Input() withScrollSubscription?: boolean = true;
    @Output() pictureClick = new EventEmitter<Picture>();
    @Output() yScrollReachEnd = new EventEmitter<void>();

    isAllPicturesLoaded: boolean = false;
    loadedPicturesSet: Set<string> = new Set<string>();
    trackByProp = trackByProp;
    private notifier$ = new Subject<void>();

    get nativeElement(): HTMLElement {
        return this.elementRef?.nativeElement;
    }

    get yScrollLimit(): number {
        return this.nativeElement.scrollHeight - this.nativeElement.clientHeight;
    }

    get isFirstLoading(): boolean {
        return (!this.pictures.length && this.isLoading) ||
            (this.pictures.length <= DEFAULT_PAGE_SIZE && !this.isAllPicturesLoaded);
    }

    get isShowFooterLoader(): boolean {
        return !this.isFirstLoading && (this.isLoading || !this.isAllPicturesLoaded);
    }

    constructor(
        private zone: NgZone,
        private elementRef: ElementRef,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if ('pictures' in changes) {
            this.isAllPicturesLoaded = this.loadedPicturesSet.size === this.pictures.length;
        }
    }

    ngAfterViewInit() {
        if (!this.withScrollSubscription) return;

        this.zone.runOutsideAngular(() => {
            fromEvent(this.nativeElement, 'scroll').pipe(
                map(({ target }: Event) => (target as HTMLElement).scrollTop),
                filter((yScrollPosition: number) => yScrollPosition === this.yScrollLimit),
                takeUntil(this.notifier$),
            ).subscribe(() => this.yScrollReachEnd.emit());
        });
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    onPictureLoad(loadedId: string): void {
        this.loadedPicturesSet.add(loadedId);
        this.isAllPicturesLoaded = this.loadedPicturesSet.size === this.pictures.length;
    }
}
