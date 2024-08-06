import { TestBed } from '@angular/core/testing';

import { RiskServiceService } from './risk-service.service';

describe('RiskServiceService', () => {
  let service: RiskServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
