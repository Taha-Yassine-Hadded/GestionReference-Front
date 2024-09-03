import { TestBed } from '@angular/core/testing';

import { OrganismeDemandeurService } from './organisme-demandeur.service';

describe('OrganismeDemandeurService', () => {
  let service: OrganismeDemandeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganismeDemandeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
