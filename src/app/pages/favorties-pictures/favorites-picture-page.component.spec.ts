import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesPicturePageComponent } from './favorites-picture-page.component';

describe('FavoritesPicturePageComponent', () => {
    let component: FavoritesPicturePageComponent;
    let fixture: ComponentFixture<FavoritesPicturePageComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [FavoritesPicturePageComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FavoritesPicturePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
