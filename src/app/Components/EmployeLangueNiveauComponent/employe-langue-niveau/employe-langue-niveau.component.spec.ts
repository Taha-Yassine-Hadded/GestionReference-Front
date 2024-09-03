import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeLangueNiveauComponent } from './employe-langue-niveau.component';

describe('EmployeLangueNiveauComponent', () => {
  let component: EmployeLangueNiveauComponent;
  let fixture: ComponentFixture<EmployeLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
