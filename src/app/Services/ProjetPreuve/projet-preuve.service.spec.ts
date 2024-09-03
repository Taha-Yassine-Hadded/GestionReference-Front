import { TestBed } from '@angular/core/testing';

import { ProjetPreuveService } from './projet-preuve.service';

describe('ProjetPreuveService', () => {
  let service: ProjetPreuveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjetPreuveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
