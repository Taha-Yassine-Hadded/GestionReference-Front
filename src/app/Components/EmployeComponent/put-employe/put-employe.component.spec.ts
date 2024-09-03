import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutEmployeComponent } from './put-employe.component';

describe('PutEmployeComponent', () => {
  let component: PutEmployeComponent;
  let fixture: ComponentFixture<PutEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
