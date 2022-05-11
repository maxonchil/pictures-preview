import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
    let service: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    it('should receive data from LS', () => {
        localStorage.setItem('MY_KEY', 'MY_VALUE');
        expect(service.get('MY_KEY')).toEqual('MY_VALUE');
    });

    it('service should clear data from LS', () => {
        localStorage.setItem('MY_KEY', 'MY_VALUE');
        service.remove('MY_KEY')
        expect(service.get('MY_KEY')).toBeNull();
    });

    it('should set data to LS', () => {
        service.set('MY_KEY', 'MY_VALUE')
        expect(service.get('MY_KEY')).toEqual('MY_VALUE');
    });
});
