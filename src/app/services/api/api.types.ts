import { HttpHeaders, HttpParams } from '@angular/common/http';

export enum HttpMethod {
    Get = 'GET',
}

export enum ContentTypes {
    Json = 'application/json',
}

export interface RequestDataOptions {
    params: HttpParams;
    headers: HttpHeaders;
    [key: string]: unknown;
}
