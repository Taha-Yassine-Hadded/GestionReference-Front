import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutNatureClientComponent } from './put-nature-client.component';

describe('PutNatureClientComponent', () => {
  let component: PutNatureClientComponent;
  let fixture: ComponentFixture<PutNatureClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutNatureClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutNatureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
