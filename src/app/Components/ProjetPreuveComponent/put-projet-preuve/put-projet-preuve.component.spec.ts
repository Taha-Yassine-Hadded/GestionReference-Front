import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutProjetPreuveComponent } from './put-projet-preuve.component';

describe('PutProjetPreuveComponent', () => {
  let component: PutProjetPreuveComponent;
  let fixture: ComponentFixture<PutProjetPreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutProjetPreuveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutProjetPreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
