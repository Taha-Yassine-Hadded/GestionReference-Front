import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDevisesComponent } from './update-devises.component';

describe('UpdateDevisesComponent', () => {
  let component: UpdateDevisesComponent;
  let fixture: ComponentFixture<UpdateDevisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDevisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateDevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
