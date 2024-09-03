import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeEducationComponent } from './create-employe-education.component';

describe('CreateEmployeEducationComponent', () => {
  let component: CreateEmployeEducationComponent;
  let fixture: ComponentFixture<CreateEmployeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
