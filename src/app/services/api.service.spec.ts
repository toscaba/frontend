import { TestBed } from '@angular/core/testing';

import { EateryService, CustomerService, ReservationService, EateryManagerService } from './api.service';

describe('ApiService', () => {
  let service: EateryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EateryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
