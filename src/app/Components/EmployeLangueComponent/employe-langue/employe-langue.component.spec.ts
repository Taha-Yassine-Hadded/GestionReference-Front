import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeLangueComponent } from './employe-langue.component';

describe('EmployeLangueComponent', () => {
  let component: EmployeLangueComponent;
  let fixture: ComponentFixture<EmployeLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeLangueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
