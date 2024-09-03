import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutOrganismeDemandeurComponent } from './put-organisme-demandeur.component';

describe('PutOrganismeDemandeurComponent', () => {
  let component: PutOrganismeDemandeurComponent;
  let fixture: ComponentFixture<PutOrganismeDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutOrganismeDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutOrganismeDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
