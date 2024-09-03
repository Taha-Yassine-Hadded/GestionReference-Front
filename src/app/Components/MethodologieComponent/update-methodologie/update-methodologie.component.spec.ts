import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMethodologieComponent } from './update-methodologie.component';

describe('UpdateMethodologieComponent', () => {
  let component: UpdateMethodologieComponent;
  let fixture: ComponentFixture<UpdateMethodologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMethodologieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMethodologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
