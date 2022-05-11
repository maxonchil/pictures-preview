import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { catchError, filter, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { Picture, PicturesDomainService } from '@services/pictures';

@Injectable()
export class PhotoItemGuard implements CanActivate, OnDestroy {
    private notifier$ = new Subject<void>();

    constructor(
        private picturesDomainService: PicturesDomainService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const queryId = route.params?.['id'];

        return this.picturesDomainService.getFavoriteById$(queryId).pipe(
            map((picture: Picture) => !!picture),
            filter((result) => result !== null),
            takeUntil(this.notifier$),
            catchError(() => {
                this.navigateToNotFound();
                return of(false);
            }),
        ) as Observable<boolean>;
    }

    ngOnDestroy() {
        this.notifier$.next();
        this.notifier$.complete();
    }

    private navigateToNotFound(): void {
        this.router.navigate(['/not-found']);
    }
}
