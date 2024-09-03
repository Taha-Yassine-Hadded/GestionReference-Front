import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployePosteComponent } from './create-employe-poste.component';

describe('CreateEmployePosteComponent', () => {
  let component: CreateEmployePosteComponent;
  let fixture: ComponentFixture<CreateEmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
