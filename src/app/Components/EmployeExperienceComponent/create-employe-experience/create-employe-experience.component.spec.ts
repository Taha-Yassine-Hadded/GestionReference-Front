import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeExperienceComponent } from './create-employe-experience.component';

describe('CreateEmployeExperienceComponent', () => {
  let component: CreateEmployeExperienceComponent;
  let fixture: ComponentFixture<CreateEmployeExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
