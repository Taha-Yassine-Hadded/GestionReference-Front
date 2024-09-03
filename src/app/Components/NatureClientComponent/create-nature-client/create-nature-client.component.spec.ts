import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNatureClientComponent } from './create-nature-client.component';

describe('CreateNatureClientComponent', () => {
  let component: CreateNatureClientComponent;
  let fixture: ComponentFixture<CreateNatureClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNatureClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNatureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
