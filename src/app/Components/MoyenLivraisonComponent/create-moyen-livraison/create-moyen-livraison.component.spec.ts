import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMoyenLivraisonComponent } from './create-moyen-livraison.component';

describe('CreateMoyenLivraisonComponent', () => {
  let component: CreateMoyenLivraisonComponent;
  let fixture: ComponentFixture<CreateMoyenLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMoyenLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMoyenLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
