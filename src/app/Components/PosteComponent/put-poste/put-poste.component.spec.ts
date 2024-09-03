import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutPosteComponent } from './put-poste.component';

describe('PutPosteComponent', () => {
  let component: PutPosteComponent;
  let fixture: ComponentFixture<PutPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutPosteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
