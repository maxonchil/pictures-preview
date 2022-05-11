import { Injectable } from '@angular/core';
import { BaseApiService, ContentTypes, DEFAULT_PAGE_SIZE, RequestOptionsBuilder } from '@services/api';
import { Observable } from 'rxjs';
import { PictureDto } from '../pictures.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class PicturesApiService extends BaseApiService {
    private readonly baseUri = 'api.unsplash.com';

    constructor(http: HttpClient) {
        super(http);
    }

    getList$(
        page: number = 1,
        limit: number = DEFAULT_PAGE_SIZE,
    ): Observable<PictureDto[]> {

        // Use it, if you exceed the API limit (50 request/hour)
        // return of(mock)
        const builder = new RequestOptionsBuilder(`${this.baseUri}/photos`)
            .withHeader('Content-Type', ContentTypes.Json)
            .withParam('page', page.toString())
            .withParam('per_page', limit.toString());

        return this.send(builder);
    }
}
