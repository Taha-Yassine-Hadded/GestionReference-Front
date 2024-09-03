import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBailleurFondComponent } from './create-bailleur-fond.component';

describe('CreateBailleurFondComponent', () => {
  let component: CreateBailleurFondComponent;
  let fixture: ComponentFixture<CreateBailleurFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBailleurFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBailleurFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
