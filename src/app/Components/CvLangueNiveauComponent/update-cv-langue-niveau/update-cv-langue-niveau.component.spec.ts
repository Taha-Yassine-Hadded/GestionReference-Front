import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCvLangueNiveauComponent } from './update-cv-langue-niveau.component';

describe('UpdateCvLangueNiveauComponent', () => {
  let component: UpdateCvLangueNiveauComponent;
  let fixture: ComponentFixture<UpdateCvLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCvLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCvLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
