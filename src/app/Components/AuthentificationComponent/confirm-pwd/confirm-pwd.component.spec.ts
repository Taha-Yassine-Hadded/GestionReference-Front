import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPwdComponent } from './confirm-pwd.component';

describe('ConfirmPwdComponent', () => {
  let component: ConfirmPwdComponent;
  let fixture: ComponentFixture<ConfirmPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPwdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
