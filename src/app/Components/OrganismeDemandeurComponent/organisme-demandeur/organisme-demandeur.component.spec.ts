import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismeDemandeurComponent } from './organisme-demandeur.component';

describe('OrganismeDemandeurComponent', () => {
  let component: OrganismeDemandeurComponent;
  let fixture: ComponentFixture<OrganismeDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganismeDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganismeDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
