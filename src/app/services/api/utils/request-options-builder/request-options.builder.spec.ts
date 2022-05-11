import { ABSOlUTE_PATH, HttpMethod, RequestDataBuilder, RequestOptionsBuilder } from '@services/api';
import { HttpHeaders, HttpParams } from '@angular/common/http';

describe('#RequestOptionsBuilder', () => {
    const relativePath = 'somePath'
    let baseOptions;
    let service;

    beforeEach(() => {
        service = new RequestOptionsBuilder(relativePath);
        baseOptions = new RequestDataBuilder(`${ABSOlUTE_PATH}/${relativePath}`, HttpMethod.Get);
    });

    it('should return instance of options', () => {
        expect(service.build()).toEqual(baseOptions);
    });

    it('should add headers', () => {
        service.withHeader('Authorization', 'somaValue');
        baseOptions.options.headers = baseOptions.options.headers.append('Authorization', 'somaValue');
        expect(service.build()).toEqual(baseOptions);
    });

    it('should add params', () => {
        service.withParam('param1', 'param1value');
        baseOptions.options.params = baseOptions.options.params.append('param1', 'param1value');
        expect(service.build()).toEqual(baseOptions);
    });

    it('should not set headers if value is undefined', () => {
        service.withParam('param1', undefined);
        expect(service.build()).toEqual(baseOptions);
    });
});
