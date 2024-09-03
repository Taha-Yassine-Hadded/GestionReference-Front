import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEnvironnementDeveloppementComponent } from './create-environnement-developpement.component';

describe('CreateEnvironnementDeveloppementComponent', () => {
  let component: CreateEnvironnementDeveloppementComponent;
  let fixture: ComponentFixture<CreateEnvironnementDeveloppementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEnvironnementDeveloppementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEnvironnementDeveloppementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
