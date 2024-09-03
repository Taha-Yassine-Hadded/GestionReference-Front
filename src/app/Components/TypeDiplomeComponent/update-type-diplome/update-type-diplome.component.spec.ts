import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeDiplomeComponent } from './update-type-diplome.component';

describe('UpdateTypeDiplomeComponent', () => {
  let component: UpdateTypeDiplomeComponent;
  let fixture: ComponentFixture<UpdateTypeDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTypeDiplomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTypeDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
