import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountTotalStatComponent } from './count-total-stat.component';

describe('CountTotalStatComponent', () => {
  let component: CountTotalStatComponent;
  let fixture: ComponentFixture<CountTotalStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountTotalStatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountTotalStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
