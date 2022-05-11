import { RequestOptionsBuilder } from '@services/api';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpMethod } from '../api.types';

export abstract class BaseApiService {
    constructor(public http: HttpClient) {}

    protected send<T>(requestBuilder: RequestOptionsBuilder): Observable<T> {
        const { url, options, method } = requestBuilder.build();

        if (method === HttpMethod.Get) return this.http.get<T>(url, options);

        throw new Error(`http method ${method} is not supported yet`);
    }
}
