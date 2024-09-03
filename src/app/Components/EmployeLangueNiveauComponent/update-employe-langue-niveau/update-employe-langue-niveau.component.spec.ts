import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeLangueNiveauComponent } from './update-employe-langue-niveau.component';

describe('UpdateEmployeLangueNiveauComponent', () => {
  let component: UpdateEmployeLangueNiveauComponent;
  let fixture: ComponentFixture<UpdateEmployeLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
