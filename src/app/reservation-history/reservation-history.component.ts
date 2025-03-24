import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryViewModel } from '../model/reservation-history';
import { ReservationHistory, ReservationService } from '../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EateryService } from '../services/eatery.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-reservation-history',
  imports: [CommonModule],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent {
  historyViewModels: HistoryViewModel[] | undefined

  constructor(private route: ActivatedRoute,
    private reservationService: ReservationService,
    private eateryService: EateryService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));

    this.reservationService.getHistory(eateryIdFromRoute).subscribe(reservations => {
      this.historyViewModels = [...reservations];
      // add eatery name and customer name to each history model
      this.historyViewModels.forEach(history => {
        this.customerService.getCustomer(history.customerId).subscribe(customer => {
          history.customerName = customer.firstName + " " + customer.lastName;
        });
        this.eateryService.getEatery(history.eateryId).subscribe(eatery => {
          history.eateryName = eatery.name;
        });
      })
    })
  }

  deleteReservation(reservationId: number, eateryId: number) {
    this.reservationService.deleteReservation(reservationId).subscribe( {
      next: (any) =>     this.reservationService.getHistory(eateryId).subscribe(reservations => {
        this.historyViewModels = [...reservations];
        // add eatery name and customer name to each history model
        this.historyViewModels.forEach(history => {
          this.customerService.getCustomer(history.customerId).subscribe(customer => {
            history.customerName = customer.firstName + " " + customer.lastName;
          });
          this.eateryService.getEatery(history.eateryId).subscribe(eatery => {
            history.eateryName = eatery.name;
          });
        })
      })
    })
  }
}
