import { TestBed } from '@angular/core/testing';

import { EnvironnementDeveloppementService } from './environnement-developpement.service';

describe('EnvironnementDeveloppementService', () => {
  let service: EnvironnementDeveloppementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironnementDeveloppementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
