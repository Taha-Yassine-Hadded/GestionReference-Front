import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeLangueComponent } from './create-employe-langue.component';

describe('CreateEmployeLangueComponent', () => {
  let component: CreateEmployeLangueComponent;
  let fixture: ComponentFixture<CreateEmployeLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeLangueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
