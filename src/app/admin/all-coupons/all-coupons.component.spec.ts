import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCouponsComponent } from './all-coupons.component';

describe('AllCouponsComponent', () => {
  let component: AllCouponsComponent;
  let fixture: ComponentFixture<AllCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCouponsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
