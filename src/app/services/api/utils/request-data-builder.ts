import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpMethod, RequestDataOptions } from '../api.types';

export class RequestDataBuilder {
    options: RequestDataOptions;
    url: string;
    method: HttpMethod;

    constructor(url: string, method: HttpMethod) {
        this.url = url;
        this.method = method;
        this.options = {
            params: new HttpParams(),
            headers: new HttpHeaders(),
        };
    }
}

