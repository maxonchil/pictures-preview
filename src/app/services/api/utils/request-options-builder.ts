import { ABSOlUTE_PATH, RequestDataBuilder } from '@services/api';
import { HttpMethod } from '../api.types';

export class RequestOptionsBuilder {
    private requestData: RequestDataBuilder;

    constructor(
        relativePath: string,
        method: HttpMethod = HttpMethod.Get,
        absolutePath: string = ABSOlUTE_PATH,
    ) {
        this.requestData = new RequestDataBuilder(`${absolutePath}/${relativePath}`, method);
    }

    withHeader(header: string, value: string | string[]): RequestOptionsBuilder {
        this.requestData.options.headers = this.requestData.options.headers.append(header, value);
        return this;
    }

    withParam(param: string, value: string | string[]): RequestOptionsBuilder {
        if (value === undefined) return this;
        if (value instanceof Array) {
            value = (value).join();
        }
        this.requestData.options.params = this.requestData.options.params.append(param, value);
        return this;
    }

    build(): RequestDataBuilder {
        return this.requestData;
    }
}
