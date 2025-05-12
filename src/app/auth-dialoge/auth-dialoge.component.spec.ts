import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogeComponent } from './auth-dialoge.component';

describe('AuthDialogeComponent', () => {
  let component: AuthDialogeComponent;
  let fixture: ComponentFixture<AuthDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
