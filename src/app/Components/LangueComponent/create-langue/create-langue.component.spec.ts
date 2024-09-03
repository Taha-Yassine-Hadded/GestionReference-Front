import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLangueComponent } from './create-langue.component';

describe('CreateLangueComponent', () => {
  let component: CreateLangueComponent;
  let fixture: ComponentFixture<CreateLangueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLangueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLangueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
