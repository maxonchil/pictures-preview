import { TestBed } from '@angular/core/testing';

import { PicturesApiService } from './pictures.service';

describe('PicturesService', () => {
    let service: PicturesApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PicturesApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
