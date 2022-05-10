import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPicturesPageComponent } from './all-pictures-page.component';

describe('AllPicturesPageComponent', () => {
  let component: AllPicturesPageComponent;
  let fixture: ComponentFixture<AllPicturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPicturesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPicturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
