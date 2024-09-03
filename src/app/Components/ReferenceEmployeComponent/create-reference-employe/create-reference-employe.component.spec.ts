import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferenceEmployeComponent } from './create-reference-employe.component';

describe('CreateReferenceEmployeComponent', () => {
  let component: CreateReferenceEmployeComponent;
  let fixture: ComponentFixture<CreateReferenceEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReferenceEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReferenceEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
