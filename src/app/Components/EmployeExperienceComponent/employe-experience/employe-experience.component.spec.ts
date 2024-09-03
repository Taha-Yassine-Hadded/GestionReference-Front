import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeExperienceComponent } from './employe-experience.component';

describe('EmployeExperienceComponent', () => {
  let component: EmployeExperienceComponent;
  let fixture: ComponentFixture<EmployeExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
