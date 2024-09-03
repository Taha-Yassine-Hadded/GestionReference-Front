import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnvironnementDeveloppementComponent } from './update-environnement-developpement.component';

describe('UpdateEnvironnementDeveloppementComponent', () => {
  let component: UpdateEnvironnementDeveloppementComponent;
  let fixture: ComponentFixture<UpdateEnvironnementDeveloppementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEnvironnementDeveloppementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEnvironnementDeveloppementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
