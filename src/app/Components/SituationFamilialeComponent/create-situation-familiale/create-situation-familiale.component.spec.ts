import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSituationFamilialeComponent } from './create-situation-familiale.component';

describe('CreateSituationFamilialeComponent', () => {
  let component: CreateSituationFamilialeComponent;
  let fixture: ComponentFixture<CreateSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
