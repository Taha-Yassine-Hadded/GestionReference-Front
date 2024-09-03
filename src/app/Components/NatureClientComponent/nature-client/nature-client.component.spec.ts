import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureClientComponent } from './nature-client.component';

describe('NatureClientComponent', () => {
  let component: NatureClientComponent;
  let fixture: ComponentFixture<NatureClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatureClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
