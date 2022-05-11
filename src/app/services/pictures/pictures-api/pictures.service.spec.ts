import { TestBed } from '@angular/core/testing';
import { PicturesApiService } from '@services/pictures';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { take } from 'rxjs/operators';
import { of } from 'rxjs';


describe('PicturesService', () => {
    let service: PicturesApiService;
    let serviceMock = {
        getList$: (page, limit) => {
            return of([...new Array(limit)]);
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: PicturesApiService, useValue: serviceMock },
            ],
        });
        service = TestBed.inject(PicturesApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return item count according to limit', () => {
        service.getList$(1, 100).pipe(
            take(1),
        ).subscribe((res) => expect(res.length).toEqual(100));

        service.getList$(1, 50).pipe(
            take(1),
        ).subscribe((res) => expect(res.length).toEqual(50));
    });

    it('should use default limit, if limit not used', () => {
        service.getList$(1).pipe(
            take(1),
        ).subscribe((res) => expect(res.length).toEqual(10));
    });
});
