import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferenceComponent } from './create-reference.component';

describe('CreateReferenceComponent', () => {
  let component: CreateReferenceComponent;
  let fixture: ComponentFixture<CreateReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
