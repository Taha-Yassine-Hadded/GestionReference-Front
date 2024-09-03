import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppelOffreComponent } from './create-appel-offre.component';

describe('CreateAppelOffreComponent', () => {
  let component: CreateAppelOffreComponent;
  let fixture: ComponentFixture<CreateAppelOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppelOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppelOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
