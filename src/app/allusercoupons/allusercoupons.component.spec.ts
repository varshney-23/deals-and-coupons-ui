import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllusercouponsComponent } from './allusercoupons.component';

describe('AllusercouponsComponent', () => {
  let component: AllusercouponsComponent;
  let fixture: ComponentFixture<AllusercouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllusercouponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllusercouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
