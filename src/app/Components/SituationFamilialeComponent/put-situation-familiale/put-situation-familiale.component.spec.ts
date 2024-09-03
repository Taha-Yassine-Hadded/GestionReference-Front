import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutSituationFamilialeComponent } from './put-situation-familiale.component';

describe('PutSituationFamilialeComponent', () => {
  let component: PutSituationFamilialeComponent;
  let fixture: ComponentFixture<PutSituationFamilialeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutSituationFamilialeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutSituationFamilialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
