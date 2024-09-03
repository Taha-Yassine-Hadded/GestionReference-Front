import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLieuxComponent } from './create-lieux.component';

describe('CreateLieuxComponent', () => {
  let component: CreateLieuxComponent;
  let fixture: ComponentFixture<CreateLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLieuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
