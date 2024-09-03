import { TestBed } from '@angular/core/testing';

import { ProjetEmployePosteService } from './projet-employe-poste.service';

describe('ProjetEmployePosteService', () => {
  let service: ProjetEmployePosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetEmployePosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
