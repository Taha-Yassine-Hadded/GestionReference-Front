import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutLangueComponent } from './put-langue.component';

describe('PutLangueComponent', () => {
  let component: PutLangueComponent;
  let fixture: ComponentFixture<PutLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutLangueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
