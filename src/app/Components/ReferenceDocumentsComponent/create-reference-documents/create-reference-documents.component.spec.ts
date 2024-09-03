import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferenceDocumentsComponent } from './create-reference-documents.component';

describe('CreateReferenceDocumentsComponent', () => {
  let component: CreateReferenceDocumentsComponent;
  let fixture: ComponentFixture<CreateReferenceDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReferenceDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReferenceDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
