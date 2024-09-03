import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutLieuxComponent } from './put-lieux.component';

describe('PutLieuxComponent', () => {
  let component: PutLieuxComponent;
  let fixture: ComponentFixture<PutLieuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PutLieuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PutLieuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
