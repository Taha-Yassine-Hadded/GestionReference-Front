import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDevisesComponent } from './create-devises.component';

describe('CreateDevisesComponent', () => {
  let component: CreateDevisesComponent;
  let fixture: ComponentFixture<CreateDevisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDevisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
