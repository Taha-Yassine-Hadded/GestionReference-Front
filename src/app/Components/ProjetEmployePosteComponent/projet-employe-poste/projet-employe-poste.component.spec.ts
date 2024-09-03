import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEmployePosteComponent } from './projet-employe-poste.component';

describe('ProjetEmployePosteComponent', () => {
  let component: ProjetEmployePosteComponent;
  let fixture: ComponentFixture<ProjetEmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetEmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetEmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
