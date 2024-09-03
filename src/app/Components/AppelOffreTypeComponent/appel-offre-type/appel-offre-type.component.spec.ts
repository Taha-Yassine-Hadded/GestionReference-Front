import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelOffreTypeComponent } from './appel-offre-type.component';

describe('AppelOffreTypeComponent', () => {
  let component: AppelOffreTypeComponent;
  let fixture: ComponentFixture<AppelOffreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelOffreTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelOffreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
