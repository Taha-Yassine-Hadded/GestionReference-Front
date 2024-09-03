import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutEmployeEducationComponent } from './put-employe-education.component';

describe('PutEmployeEducationComponent', () => {
  let component: PutEmployeEducationComponent;
  let fixture: ComponentFixture<PutEmployeEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutEmployeEducationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutEmployeEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
