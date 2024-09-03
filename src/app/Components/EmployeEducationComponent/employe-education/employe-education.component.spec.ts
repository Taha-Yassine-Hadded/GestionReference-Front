import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeEducationComponent } from './employe-education.component';

describe('EmployeEducationComponent', () => {
  let component: EmployeEducationComponent;
  let fixture: ComponentFixture<EmployeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
