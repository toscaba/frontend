import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { ReservationService } from './reservation.service';
import { EateryService } from './eatery.service';

describe('ApiService', () => {
  let eateryservice: EateryService;
  let customerService: CustomerService;
  let reservationService: ReservationService;
  let eateryService: EateryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    eateryservice = TestBed.inject(EateryService);
    customerService = TestBed.inject(CustomerService);
    reservationService = TestBed.inject(ReservationService);
    eateryService = TestBed.inject(EateryService);
  });

  it('should be created', () => {
    expect(eateryservice).toBeTruthy();
    expect(customerService).toBeTruthy();
    expect(reservationService).toBeTruthy();
    expect(eateryService).toBeTruthy();
  });
});
