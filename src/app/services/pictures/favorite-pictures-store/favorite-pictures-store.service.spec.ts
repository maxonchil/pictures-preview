import { TestBed } from '@angular/core/testing';

import { FavoritePicturesStoreService } from './favorite-pictures-store.service';

describe('FavoritePicturesStoreService', () => {
  let service: FavoritePicturesStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePicturesStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
