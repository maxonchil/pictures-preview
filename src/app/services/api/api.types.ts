import { HttpHeaders, HttpParams } from '@angular/common/http';

export enum HttpMethod {
    Get = 'GET',
}

export enum ContentTypes {
    Json = 'application/json',
}

export interface RequestDataOptions {
    [key: string]: unknown;
    params: HttpParams;
    headers: HttpHeaders;
    body?: unknown;
    withCredentials?: boolean;
}
