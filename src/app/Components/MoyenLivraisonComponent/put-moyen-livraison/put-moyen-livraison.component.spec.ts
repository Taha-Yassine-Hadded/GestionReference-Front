import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutMoyenLivraisonComponent } from './put-moyen-livraison.component';

describe('PutMoyenLivraisonComponent', () => {
  let component: PutMoyenLivraisonComponent;
  let fixture: ComponentFixture<PutMoyenLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutMoyenLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutMoyenLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
