import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeDocumentComponent } from './update-type-document.component';

describe('UpdateTypeDocumentComponent', () => {
  let component: UpdateTypeDocumentComponent;
  let fixture: ComponentFixture<UpdateTypeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
