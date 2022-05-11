import { TestBed } from '@angular/core/testing';

import { StoreNotifierService } from './store-notifier.service';
import { catchError, from, of, Subject, takeUntil } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { take } from 'rxjs/operators';

describe('StoreNotifierService', () => {
    let service: StoreNotifierService;
    const actions$ = from([
        { type: 'FirstType'},
        { type: 'SecondType'},
        { type: 'ThirdType'},
    ])

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Actions, useValue: actions$}
            ],
        });
        service = TestBed.inject(StoreNotifierService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#listenFor$', () => {
        it('should emit type if it is in stream', () => {
            service.listenFor$('FirstType').pipe(
                take(1),
            ).subscribe((res) => expect(res.type).toEqual('FirstType'))
        });

        it('should not emit, if no such value in stream', () => {
            const spy = jest.spyOn( service.listenFor$('FirstTyp343e'), 'subscribe')
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    describe('$listerForAction', () => {
        it('should emit only one, if target action was found', () => {
            const notifier$ = new Subject<void>();
            let emits = 0;

            setTimeout(() => {
                notifier$.next();
                notifier$.complete();
            }, 300)
            service.listenFor$('FirstType').pipe(
                takeUntil(notifier$),
            ).subscribe(() => emits++);

            expect(emits).toEqual(1);
        });
    });

    describe('notify$', () => {
        it('should be called if success emited', () => {
            service.notify$('FirstType', 'asd').pipe(
                take(1),
            ).subscribe((res) => expect(res).toBeTruthy())
        });

        it('should be called if success emited', () => {
            let errorCatched = false;
            service.notify$('FirsweetType', 'FirstType').pipe(
                take(1),
                catchError(() => {
                    errorCatched = true;
                    return of(undefined);
                }),
            ).subscribe(() => expect(errorCatched).toBeTruthy())
        });
    });
});
