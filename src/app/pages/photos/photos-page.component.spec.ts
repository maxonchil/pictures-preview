import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosPageComponent } from './photo-page.component';

describe('PhotoPageComponent', () => {
    let component: PhotosPageComponent;
    let fixture: ComponentFixture<PhotosPageComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [PhotosPageComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PhotosPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
