import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSecteurActiviteComponent } from './create-secteur-activite.component';

describe('CreateSecteurActiviteComponent', () => {
  let component: CreateSecteurActiviteComponent;
  let fixture: ComponentFixture<CreateSecteurActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSecteurActiviteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSecteurActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
