import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTechnologieComponent } from './update-technologie.component';

describe('UpdateTechnologieComponent', () => {
  let component: UpdateTechnologieComponent;
  let fixture: ComponentFixture<UpdateTechnologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTechnologieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTechnologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
