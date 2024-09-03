import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BailleurFondComponent } from './bailleur-fond.component';

describe('BailleurFondComponent', () => {
  let component: BailleurFondComponent;
  let fixture: ComponentFixture<BailleurFondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BailleurFondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BailleurFondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
