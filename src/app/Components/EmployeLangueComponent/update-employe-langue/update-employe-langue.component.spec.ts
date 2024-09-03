import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeLangueComponent } from './update-employe-langue.component';

describe('UpdateEmployeLangueComponent', () => {
  let component: UpdateEmployeLangueComponent;
  let fixture: ComponentFixture<UpdateEmployeLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeLangueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmployeLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
