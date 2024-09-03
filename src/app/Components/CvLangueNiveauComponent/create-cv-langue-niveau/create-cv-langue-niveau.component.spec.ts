import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCvLangueNiveauComponent } from './create-cv-langue-niveau.component';

describe('CreateCvLangueNiveauComponent', () => {
  let component: CreateCvLangueNiveauComponent;
  let fixture: ComponentFixture<CreateCvLangueNiveauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCvLangueNiveauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCvLangueNiveauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
