import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjetEmployePosteComponent } from './create-projet-employe-poste.component';

describe('CreateProjetEmployePosteComponent', () => {
  let component: CreateProjetEmployePosteComponent;
  let fixture: ComponentFixture<CreateProjetEmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjetEmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjetEmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
