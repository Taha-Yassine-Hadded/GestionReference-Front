import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployePosteComponent } from './employe-poste.component';

describe('EmployePosteComponent', () => {
  let component: EmployePosteComponent;
  let fixture: ComponentFixture<EmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
