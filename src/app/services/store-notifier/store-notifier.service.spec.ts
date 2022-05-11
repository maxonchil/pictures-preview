import { TestBed } from '@angular/core/testing';

import { StoreNotifierService } from './store-notifier.service';

describe('StoreNotifierService', () => {
    let service: StoreNotifierService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StoreNotifierService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
