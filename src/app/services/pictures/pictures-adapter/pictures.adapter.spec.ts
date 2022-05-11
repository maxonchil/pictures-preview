import { TestBed } from '@angular/core/testing';

import { PictureAdapter } from './picture-adapter.service';

describe('PictureAdapterService', () => {
    let service: PictureAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PictureAdapter);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
