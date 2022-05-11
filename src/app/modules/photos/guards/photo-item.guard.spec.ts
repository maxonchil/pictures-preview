import { TestBed } from '@angular/core/testing';

import { PhotoItemGuard } from './photo-item.guard';

describe('PhotoItemGuard', () => {
    let guard: PhotoItemGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        guard = TestBed.inject(PhotoItemGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});
