import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutProjetEmployePosteComponent } from './put-projet-employe-poste.component';

describe('PutProjetEmployePosteComponent', () => {
  let component: PutProjetEmployePosteComponent;
  let fixture: ComponentFixture<PutProjetEmployePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutProjetEmployePosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutProjetEmployePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
