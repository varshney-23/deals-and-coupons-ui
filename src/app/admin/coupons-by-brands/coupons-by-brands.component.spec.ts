import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsByBrandsComponent } from './coupons-by-brands.component';

describe('CouponsByBrandsComponent', () => {
  let component: CouponsByBrandsComponent;
  let fixture: ComponentFixture<CouponsByBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsByBrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsByBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
