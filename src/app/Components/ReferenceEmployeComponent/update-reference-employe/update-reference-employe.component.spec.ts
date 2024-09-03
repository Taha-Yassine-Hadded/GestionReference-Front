import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReferenceEmployeComponent } from './update-reference-employe.component';

describe('UpdateReferenceEmployeComponent', () => {
  let component: UpdateReferenceEmployeComponent;
  let fixture: ComponentFixture<UpdateReferenceEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReferenceEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReferenceEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
