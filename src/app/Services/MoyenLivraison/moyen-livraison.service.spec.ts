import { TestBed } from '@angular/core/testing';

import { MoyenLivraisonService } from '../../moyen-livraison.service';

describe('MoyenLivraisonService', () => {
  let service: MoyenLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoyenLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
