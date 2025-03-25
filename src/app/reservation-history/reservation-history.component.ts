import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryViewModel } from '../model/reservation-history';
import { ReservationService } from '../services/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { EateryService } from '../services/eatery.service';
import { CustomerService } from '../services/customer.service';
import { ReservationViewModel } from '../model/reservation';

@Component({
  selector: 'app-reservation-history',
  imports: [CommonModule],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent {
  existingReservations: ReservationViewModel[] | undefined;
  historyViewModels: HistoryViewModel[] | undefined;
  eateryId: number | undefined

  constructor(private route: ActivatedRoute,
    private reservationService: ReservationService,
    private eateryService: EateryService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));
    this.eateryId = eateryIdFromRoute;

    this.reservationService.getReservations().subscribe(reservations => {
      this.existingReservations = [...reservations];
      this.existingReservations = this.existingReservations.filter(reservation => {
        return reservation.eateryId === this.eateryId;
      });

      this.existingReservations.forEach(reservation => {
        this.customerService.getCustomer(reservation.customerId).subscribe(customer => {
          reservation.customerName = customer.firstName + " " + customer.lastName;
        });
        this.eateryService.getEatery(reservation.eateryId).subscribe(eatery => {
          reservation.eateryName = eatery.name;
        });
      });
    })

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
    this.reservationService.deleteReservation(reservationId).subscribe({
      next: (any) => this.reservationService.getHistory(eateryId).subscribe(reservations => {

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

        this.reservationService.getReservations().subscribe(reservations => {
          this.existingReservations = [...reservations];
          this.existingReservations = this.existingReservations.filter(reservation => {
            return reservation.eateryId === eateryId;
          });
          this.existingReservations.forEach(reservation => {
            this.customerService.getCustomer(reservation.customerId).subscribe(customer => {
              reservation.customerName = customer.firstName + " " + customer.lastName;
            });
            this.eateryService.getEatery(reservation.eateryId).subscribe(eatery => {
              reservation.eateryName = eatery.name;
            });
          });
        })
      }),
      error: (e) => console.log(e)
    })
  }

  completeReservation(reservationId: number, eateryId: number){
    this.reservationService.completeReservation(reservationId).subscribe({
      next: (any) => this.reservationService.getHistory(eateryId).subscribe(reservations => {

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

        this.reservationService.getReservations().subscribe(reservations => {
          this.existingReservations = [...reservations];
          this.existingReservations = this.existingReservations.filter(reservation => {
            return reservation.eateryId === eateryId;
          });
          this.existingReservations.forEach(reservation => {
            this.customerService.getCustomer(reservation.customerId).subscribe(customer => {
              reservation.customerName = customer.firstName + " " + customer.lastName;
            });
            this.eateryService.getEatery(reservation.eateryId).subscribe(eatery => {
              reservation.eateryName = eatery.name;
            });
          });
        })
      }),
      error: (e) => console.log(e)
    })
  }

  absentReservation(reservationId: number, eateryId: number){
    this.reservationService.absentReservation(reservationId).subscribe({
      next: (any) => this.reservationService.getHistory(eateryId).subscribe(reservations => {
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

        this.reservationService.getReservations().subscribe(reservations => {
          this.existingReservations = [...reservations];
          this.existingReservations = this.existingReservations.filter(reservation => {
            return reservation.eateryId === eateryId;
          });
          this.existingReservations.forEach(reservation => {
            this.customerService.getCustomer(reservation.customerId).subscribe(customer => {
              reservation.customerName = customer.firstName + " " + customer.lastName;
            });
            this.eateryService.getEatery(reservation.eateryId).subscribe(eatery => {
              reservation.eateryName = eatery.name;
            });
          });
        })
      }),
      error: (e) => console.log(e)
    })
  }

  cancelReservation(reservationId: number, eateryId: number) {
    this.reservationService.cancelReservation(reservationId).subscribe({
      next: (any) => this.reservationService.getHistory(eateryId).subscribe(reservations => {

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

        this.reservationService.getReservations().subscribe(reservations => {
          this.existingReservations = [...reservations];
          this.existingReservations = this.existingReservations.filter(reservation => {
            return reservation.eateryId === eateryId;
          });
          this.existingReservations.forEach(reservation => {
            this.customerService.getCustomer(reservation.customerId).subscribe(customer => {
              reservation.customerName = customer.firstName + " " + customer.lastName;
            });
            this.eateryService.getEatery(reservation.eateryId).subscribe(eatery => {
              reservation.eateryName = eatery.name;
            });
          });
        })
      }),
      error: (e) => console.log(e)
    })
  }
}