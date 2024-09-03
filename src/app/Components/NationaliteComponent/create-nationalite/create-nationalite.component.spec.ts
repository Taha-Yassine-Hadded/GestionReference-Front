import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNationaliteComponent } from './create-nationalite.component';

describe('CreateNationaliteComponent', () => {
  let component: CreateNationaliteComponent;
  let fixture: ComponentFixture<CreateNationaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNationaliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNationaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
