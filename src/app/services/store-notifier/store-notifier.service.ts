import { Injectable } from '@angular/core';
import { filter, merge, Observable, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StoreNotifierService {
    constructor(private actions: Actions) {}

    listerForAction(type: string): Observable<Action> {
        return this.listenFor$(type).pipe(take(1));
    }

    notify$(successType: string, errorType: string): Observable<Action> {
        const success$ = this.listerForAction(successType);
        const error$: Observable<never> = this.listerForAction(errorType).pipe(
            switchMap((action: Action) => throwError(new Error(action.type))),
        );
        return merge(success$, error$).pipe(take(1));
    }

    listenFor$(type: string): Observable<Action> {
        return this.actions.pipe(
            filter((action: Action) => type === action?.type),
        );
    }
}
