import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutPaysComponent } from './put-pays.component';

describe('PutPaysComponent', () => {
  let component: PutPaysComponent;
  let fixture: ComponentFixture<PutPaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutPaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
