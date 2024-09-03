import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppelOffreTypeComponent } from './create-appel-offre-type.component';

describe('CreateAppelOffreTypeComponent', () => {
  let component: CreateAppelOffreTypeComponent;
  let fixture: ComponentFixture<CreateAppelOffreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppelOffreTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppelOffreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
