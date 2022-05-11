import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(this.setUpParams(request)).pipe(
            catchError((err: HttpErrorResponse) => {
                console.error(err);
                return throwError(err);
            }),
        );
    }

    private setUpParams<T>(req: HttpRequest<T>) {
        const baseParams = req.params ?? new HttpParams();

        // This is needed for 'unsplash.com' API. Limit = 50 request/hour or use data in mocked file
        return req.clone({
            params: baseParams.set('client_id', 'Zo2XTVozDGgYKz6mBJVRchTAwUf0RysajVOIjXRSuZk'),
        });
    }
}
