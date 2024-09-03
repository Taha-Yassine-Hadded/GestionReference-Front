import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutNationaliteComponent } from './put-nationalite.component';

describe('PutNationaliteComponent', () => {
  let component: PutNationaliteComponent;
  let fixture: ComponentFixture<PutNationaliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutNationaliteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutNationaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
