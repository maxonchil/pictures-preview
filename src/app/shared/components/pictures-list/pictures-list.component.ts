import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
} from '@angular/core';
import { Picture } from '@services/pictures';
import { trackByProp } from '@shared/utils';
import { filter, fromEvent, map, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-pictures-list',
    templateUrl: './pictures-list.component.html',
    styleUrls: ['./pictures-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PicturesListComponent implements AfterViewInit, OnDestroy {
    @Input() pictures!: Picture[];
    @Input() isLoading!: boolean;
    @Input() withScrollSubscription?: boolean = true;
    @Output() pictureClick = new EventEmitter<Picture>();
    @Output() yScrollReachEnd = new EventEmitter<void>();

    trackByProp = trackByProp;
    private notifier$ = new Subject<void>();

    get nativeElement(): HTMLElement {
        return this.elementRef?.nativeElement;
    }

    get yScrollLimit(): number {
        return this.nativeElement.scrollHeight - this.nativeElement.clientHeight;
    }

    constructor(
        private zone: NgZone,
        private elementRef: ElementRef,
    ) {}

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
}
