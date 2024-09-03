import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReferenceDocumentsComponent } from './update-reference-documents.component';

describe('UpdateReferenceDocumentsComponent', () => {
  let component: UpdateReferenceDocumentsComponent;
  let fixture: ComponentFixture<UpdateReferenceDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReferenceDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReferenceDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
