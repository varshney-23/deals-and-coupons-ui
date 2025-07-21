import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranddialogComponent } from './branddialog.component';

describe('BranddialogComponent', () => {
  let component: BranddialogComponent;
  let fixture: ComponentFixture<BranddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranddialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
