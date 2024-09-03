import { TestBed } from '@angular/core/testing';

import { AppelOffreTypeService } from './appel-offre-type.service';

describe('AppelOffreTypeService', () => {
  let service: AppelOffreTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppelOffreTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
