import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CustomerViewModel } from '../model/customer';
import { CustomerService } from '../services/customer.service';
import { ReservationService, Reservation } from '../services/reservation.service';
import { ReservationViewModel } from '../model/reservation'
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { EateryService } from '../services/eatery.service';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customerViewModel: CustomerViewModel | undefined;
  dialog = inject(MatDialog);
  private reservationViewModel: ReservationViewModel = {
    id: 0,
    customerId: 0,
    eateryId: 0,
    eateryName: "",
    guestNumber: 0,
    reservationDateTime: "",
    status: ""
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private customerService: CustomerService,
    private reservationService: ReservationService,
    private eateryService: EateryService
  ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const customerIdFromRoute = Number(routeParams.get('customerId'));

    this.customerService?.getCustomer(customerIdFromRoute).subscribe(customer => {
      this.customerViewModel = customer;
      // add eatery name to each reservation view model
      this.customerViewModel?.reservations?.forEach(reservationModel =>
        this.eateryService?.getEatery(reservationModel.eateryId).subscribe(eatery => {
          reservationModel.eateryName = eatery.name;
        })
      )
    });

    this.authService.currentCustomer.subscribe(customer => this.customerViewModel = customer);
  }

  updateCustomer(customerId: number) {
    this.router.navigateByUrl('/profile/' + customerId + '/edit')
  }

  cancelReservation(reservationId: number) {
    if (reservationId == null) {
      return;
    }

    this.reservationService.cancelReservation(reservationId).subscribe({
      next: (reservation) => this.cancelSuccess(reservation),
      error: (e) => this.fail(e)
    });
  }

  updateReservation(reservationId: number) {
    this.router.navigateByUrl('/reservations/' + reservationId);
  }

  cancelSuccess(reservation: Reservation) {
    this.reservationViewModel = reservation;

    this.eateryService?.getEatery(reservation.eateryId).subscribe(eatery => {
      this.reservationViewModel.eateryName = eatery?.name;
    });

    this.customerViewModel?.reservations?.map(x => {
      let temp = Object.assign(x, {});
      if (x.id == reservation.id) { temp.status = reservation.status; }
      return temp
    });

    this.dialog.open(Dialog, { data: { isSuccess: true, reservation: this.reservationViewModel } });
  }

  fail(e: any) {
    console.error(e);
    this.dialog.open(Dialog, { data: { isSuccess: false, reservation: this.reservationViewModel } });
  }
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer_reservation_dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}
