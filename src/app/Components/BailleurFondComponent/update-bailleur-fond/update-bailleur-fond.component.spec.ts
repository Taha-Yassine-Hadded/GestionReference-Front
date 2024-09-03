import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBailleurFondComponent } from './update-bailleur-fond.component';

describe('UpdateBailleurFondComponent', () => {
  let component: UpdateBailleurFondComponent;
  let fixture: ComponentFixture<UpdateBailleurFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBailleurFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBailleurFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
