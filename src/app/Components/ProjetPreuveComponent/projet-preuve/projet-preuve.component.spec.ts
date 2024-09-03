import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetPreuveComponent } from './projet-preuve.component';

describe('ProjetPreuveComponent', () => {
  let component: ProjetPreuveComponent;
  let fixture: ComponentFixture<ProjetPreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetPreuveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetPreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
