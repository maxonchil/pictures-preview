import { TestBed } from '@angular/core/testing';

import { PicturesDomainService } from './pictures-domain.service';

describe('PicturesDomainService', () => {
  let service: PicturesDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicturesDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
