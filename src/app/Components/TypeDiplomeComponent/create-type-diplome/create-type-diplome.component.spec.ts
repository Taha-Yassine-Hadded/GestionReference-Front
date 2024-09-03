import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeDiplomeComponent } from './create-type-diplome.component';

describe('CreateTypeDiplomeComponent', () => {
  let component: CreateTypeDiplomeComponent;
  let fixture: ComponentFixture<CreateTypeDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTypeDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTypeDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
