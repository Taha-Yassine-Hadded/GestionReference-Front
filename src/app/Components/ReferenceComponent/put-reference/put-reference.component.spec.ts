import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutReferenceComponent } from './put-reference.component';

describe('PutReferenceComponent', () => {
  let component: PutReferenceComponent;
  let fixture: ComponentFixture<PutReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
