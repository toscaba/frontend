import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { EateryService } from '../services/eatery.service';
import { ReservationService } from '../services/reservation.service';
import { CustomerViewModel } from '../model/customer';
import { EateryViewModel } from '../model/eatery';
import { ReservationViewModel } from '../model/reservation';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CreateReservationRequest } from '../services/reservation.service';
import { convertToString } from '../../util/date-converter';

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
  eateryViewModel: EateryViewModel | undefined;
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
  @Input() dateTime: Date | undefined;
  @Input() guestNumber: number | undefined;

  constructor(private route: ActivatedRoute,
    private reservationService: ReservationService,
    private eateryService: EateryService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));

    this.eateryService?.getEatery(eateryIdFromRoute).subscribe(eatery => {
      this.eateryViewModel = eatery;
    });

    this.authService.currentCustomer.subscribe(customer => this.customerViewModel = customer);
  }

  onSubmit() {
    if(!this.dateTime || !this.guestNumber) {
      alert('Fill in required fields marked with *')
      return;
    }

    let reservationRequest: CreateReservationRequest = {
      customerId: this.customerViewModel?.id ?? 0,
      eateryId: this.eateryViewModel?.id ?? 0,
      guestNumber: this.guestNumber,
      reservationDateTime: convertToString(this.dateTime)
    }

    this.reservationService.createReservation(reservationRequest).subscribe({
      next: (reservation) => this.success(reservation),
      error: (e) => this.fail(e)
    });
  }

  success(reservation: ReservationViewModel) {
    this.reservationViewModel = reservation;
    this.reservationViewModel.eateryName = this.eateryViewModel?.name;
    this.dialog.open(Dialog, { data: { isSuccess: true, reservation: this.reservationViewModel } });
    this.router.navigateByUrl('/profile/' + this.customerViewModel?.id);
  }

  fail(e: any) {
    console.log(e);
    this.reservationViewModel.eateryName = this.eateryViewModel?.name;
    this.dialog.open(Dialog, { data: { isSuccess: false, reservation: this.reservationViewModel } });
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
