import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAppelOffreComponent } from './put-appel-offre.component';

describe('PutAppelOffreComponent', () => {
  let component: PutAppelOffreComponent;
  let fixture: ComponentFixture<PutAppelOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAppelOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAppelOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
