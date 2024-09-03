import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvLangueNiveauComponent } from './cv-langue-niveau.component';

describe('CvLangueNiveauComponent', () => {
  let component: CvLangueNiveauComponent;
  let fixture: ComponentFixture<CvLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
