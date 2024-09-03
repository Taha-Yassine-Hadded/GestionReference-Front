import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironnementDeveloppementComponent } from './environnement-developpement.component';

describe('EnvironnementDeveloppementComponent', () => {
  let component: EnvironnementDeveloppementComponent;
  let fixture: ComponentFixture<EnvironnementDeveloppementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironnementDeveloppementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvironnementDeveloppementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
