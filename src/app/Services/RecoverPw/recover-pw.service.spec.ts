import { TestBed } from '@angular/core/testing';

import { RecoverPwService } from './recover-pw.service';

describe('RecoverPwService', () => {
  let service: RecoverPwService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverPwService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
