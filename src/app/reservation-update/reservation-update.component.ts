import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Reservation } from '../model/reservation';

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
  reservation: Reservation | undefined;
  @Input() dateTime: Date | undefined;
  @Input() guestNumber: number | undefined;

  constructor(private route: ActivatedRoute) {}

  onSubmit() {
    console.log("DATETIME", this.dateTime);
    console.log("GUEST NUMBER", this.guestNumber);
    alert("Update clicked!")
      // TODO: connect to API update reservation
      // this.apiService.updateReservation(reservationID, dateTime, guestNumber).subscribe(
      //   (data) => {
      //     // Handle successful update reservation
      //     console.log('Reservation update successful:', data);
      //   },
      //   (error) => {
      //     // Handle update failure
      //     console.error('Reservation update failed:', error);
      //   }
      // );
    // }
  }

  ngOnInit() {
    // First get the reservation id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const reservationIdFromRoute = Number(routeParams.get('reservationId'));
    console.log("RESERVATION ID", reservationIdFromRoute);
  
    // TODO: Find the reservation that correspond with the id provided in route.
    // this.reservation = this.apiService.getReservation(reservationId).find(reservation => reservation.id === reservationIdFromRoute);
  }
}
