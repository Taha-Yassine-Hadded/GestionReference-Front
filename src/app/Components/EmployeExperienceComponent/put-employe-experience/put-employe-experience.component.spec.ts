import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutEmployeExperienceComponent } from './put-employe-experience.component';

describe('PutEmployeExperienceComponent', () => {
  let component: PutEmployeExperienceComponent;
  let fixture: ComponentFixture<PutEmployeExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutEmployeExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutEmployeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
