import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployePosteComponent } from './update-employe-poste.component';

describe('UpdateEmployePosteComponent', () => {
  let component: UpdateEmployePosteComponent;
  let fixture: ComponentFixture<UpdateEmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
