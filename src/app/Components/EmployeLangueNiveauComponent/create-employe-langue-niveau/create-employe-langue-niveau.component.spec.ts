import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeLangueNiveauComponent } from './create-employe-langue-niveau.component';

describe('CreateEmployeLangueNiveauComponent', () => {
  let component: CreateEmployeLangueNiveauComponent;
  let fixture: ComponentFixture<CreateEmployeLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
