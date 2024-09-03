import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjetPreuveComponent } from './create-projet-preuve.component';

describe('CreateProjetPreuveComponent', () => {
  let component: CreateProjetPreuveComponent;
  let fixture: ComponentFixture<CreateProjetPreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjetPreuveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjetPreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
