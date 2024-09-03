import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyenLivraisonComponent } from './moyen-livraison.component';

describe('MoyenLivraisonComponent', () => {
  let component: MoyenLivraisonComponent;
  let fixture: ComponentFixture<MoyenLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyenLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoyenLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
