import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnologieComponent } from './create-technologie.component';

describe('CreateTechnologieComponent', () => {
  let component: CreateTechnologieComponent;
  let fixture: ComponentFixture<CreateTechnologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTechnologieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTechnologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
