import { Injectable } from '@angular/core';
import { RequestOptionsBuilder } from '../../api/utils/request-options-builder';
import { BaseApiService } from '../../api/base-api/base-api.service';
import { Observable, of } from 'rxjs';
import { PictureDto } from '../pictures.types';
import { ContentTypes, HttpMethod } from '../../api';
import { HttpClient } from '@angular/common/http';
import { mock } from './mock';

@Injectable({
    providedIn: 'root',
})
export class PicturesApiService extends BaseApiService {
    private readonly baseUri = 'api.unsplash.com';

    constructor(http: HttpClient) {
        super(http);
    }

    getList$(
        page = 1,
        limit:number = 10,
    ): Observable<PictureDto[]> {

        return of(mock);
        // const builder = new RequestOptionsBuilder(`${this.baseUri}/photos`)
        //     .withHeader('Content-Type', ContentTypes.Json)
        //     .withParam('page', page.toString())
        //     .withParam('per_page', limit.toString())
        //     .withParam('client_id', 'Zo2XTVozDGgYKz6mBJVRchTAwUf0RysajVOIjXRSuZk');
        //
        // console.log('builder', builder);
        //
        // return this.send(builder);
    }
}
