import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelOffreDetailsComponent } from './appel-offre-details.component';

describe('AppelOffreDetailsComponent', () => {
  let component: AppelOffreDetailsComponent;
  let fixture: ComponentFixture<AppelOffreDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelOffreDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelOffreDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
