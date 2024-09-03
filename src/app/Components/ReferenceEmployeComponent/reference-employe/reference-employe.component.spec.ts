import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceEmployeComponent } from './reference-employe.component';

describe('ReferenceEmployeComponent', () => {
  let component: ReferenceEmployeComponent;
  let fixture: ComponentFixture<ReferenceEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferenceEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
