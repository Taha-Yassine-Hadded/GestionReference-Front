import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSecteurActiviteComponent } from './update-secteur-activite.component';

describe('UpdateSecteurActiviteComponent', () => {
  let component: UpdateSecteurActiviteComponent;
  let fixture: ComponentFixture<UpdateSecteurActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSecteurActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSecteurActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
