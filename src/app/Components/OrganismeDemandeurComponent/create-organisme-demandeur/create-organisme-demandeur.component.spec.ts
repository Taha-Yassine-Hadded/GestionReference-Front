import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganismeDemandeurComponent } from './create-organisme-demandeur.component';

describe('CreateOrganismeDemandeurComponent', () => {
  let component: CreateOrganismeDemandeurComponent;
  let fixture: ComponentFixture<CreateOrganismeDemandeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrganismeDemandeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrganismeDemandeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
