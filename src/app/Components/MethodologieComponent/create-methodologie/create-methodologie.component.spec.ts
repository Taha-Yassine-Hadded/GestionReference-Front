import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMethodologieComponent } from './create-methodologie.component';

describe('CreateMethodologieComponent', () => {
  let component: CreateMethodologieComponent;
  let fixture: ComponentFixture<CreateMethodologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMethodologieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMethodologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
