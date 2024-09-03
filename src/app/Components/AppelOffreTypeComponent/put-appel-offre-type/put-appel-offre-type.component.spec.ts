import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutAppelOffreTypeComponent } from './put-appel-offre-type.component';

describe('PutAppelOffreTypeComponent', () => {
  let component: PutAppelOffreTypeComponent;
  let fixture: ComponentFixture<PutAppelOffreTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutAppelOffreTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutAppelOffreTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
