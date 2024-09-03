import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutCategorieComponent } from './put-categorie.component';

describe('PutCategorieComponent', () => {
  let component: PutCategorieComponent;
  let fixture: ComponentFixture<PutCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutCategorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
