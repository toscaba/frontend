import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ReservationViewModel } from '../model/reservation';
import { UpdateReservationRequest } from '../services/reservation.service';
import { ReservationService } from '../services/reservation.service';
import { EateryService } from '../services/eatery.service';
import { convertToString } from '../../util/date-converter';

@Component({
  selector: 'app-reservation-update',
  imports: [
    FormsModule, 
    MatNativeDateModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTimepickerModule, 
    MatDatepickerModule
  ],
  templateUrl: './reservation-update.component.html',
  styleUrl: './reservation-update.component.css'
})
export class ReservationUpdateComponent implements OnInit {
  reservationViewModel: ReservationViewModel = { 
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

  dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute, private router: Router, private reservationService: ReservationService, private eateryService: EateryService) {}

  ngOnInit() {
    // get the reservation id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const reservationIdFromRoute = Number(routeParams.get('reservationId'));
  
    this.reservationService.getReservation(reservationIdFromRoute).subscribe(reservation => {
      this.reservationViewModel = reservation;  
      this.eateryService?.getEatery(reservation.eateryId).subscribe(eatery => {
        this.reservationViewModel.eateryName = eatery.name;
      });
    });
  }

  onSubmit() {
    if(!this.dateTime || !this.guestNumber) {
      alert('Fill in required fields marked with *')
      return;
    }

    let reservationRequest: UpdateReservationRequest = {
      guestNumber: this.guestNumber,
      reservationDateTime: convertToString(this.dateTime)
    }

    this.reservationService.updateReservation(this.reservationViewModel.id, reservationRequest).subscribe({
      next: (reservation) => this.success(reservation),
      error: (e) => this.fail(e)
    });
  }

  success(reservation: ReservationViewModel) {
    this.reservationViewModel = reservation;
    this.dialog.open(Dialog, { data: { isSuccess: true, reservation: this.reservationViewModel } });
    this.router.navigateByUrl('/profile/' + this.reservationViewModel?.customerId);
  }
  
  fail(e: any) {
    console.log(e);
    this.dialog.open(Dialog, { data: { isSuccess: false, reservation: this.reservationViewModel } });
  }
}

@Component({
  selector: 'app-reservation-update',
  templateUrl: './reservation_update_dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}
