import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { EateryService, ReservationService } from '../services/api.service';
import { Customer } from '../model/customer';
import { Eatery } from '../model/eatery';
import { Reservation } from '../model/reservation';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reservation',
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit {
  eatery: Eatery | undefined;
  customer: Customer | undefined;
  dialog = inject(MatDialog);
  private reservation: Reservation = { id: 0, customerId: 0, eateryId: 0, eateryName: "", guestNumber: 0, reservationDateTime: "", status: "" };
  @Input() dateTime: Date | undefined;
  @Input() guestNumber: number | undefined;

  constructor(private route: ActivatedRoute,
    private reservationService: ReservationService,
    private eateryService: EateryService,
    private router: Router,
    private authService: AuthService) {
  }

  onSubmit() {
    if (this.dateTime == null) {
      return;
    }

    const year = this.dateTime.getFullYear();
    const month = ("0" + (this.dateTime.getMonth() + 1)).slice(-2);
    const day = ("0" + this.dateTime.getDate()).slice(-2);
    const hours = ("0" + this.dateTime.getHours()).slice(-2);
    const minutes = ("0" + this.dateTime.getMinutes()).slice(-2);
    const seconds = ("0" + this.dateTime.getSeconds()).slice(-2);

    this.reservation.reservationDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    this.reservation.guestNumber = this.guestNumber ?? 0;
    this.reservation.customerId = this.customer?.id ?? 0;

    this.reservationService.createReservation(this.reservation).subscribe({
      next: (reservation) => this.success(reservation),
      error: (e) => this.fail(e)
    });
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));

    this.eateryService?.getEatery(eateryIdFromRoute).subscribe(eatery => {
      this.eatery = eatery;
      this.reservation.eateryId = eateryIdFromRoute;
    });

    this.authService.currentCustomer.subscribe(customer => this.customer = customer);
  }

  success(reservation: Reservation) {
    this.reservation = reservation;
    this.dialog.open(Dialog, { data: { isSuccess: true, reservation: this.reservation } });
    this.router.navigateByUrl('/profile/' + this.customer?.id);
  }

  fail(e: any) {
    console.log(e);
    this.dialog.open(Dialog, { data: { isSuccess: false, reservation: this.reservation } });
  }
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation_dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}
