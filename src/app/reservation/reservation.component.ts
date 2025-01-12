import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTimepickerModule} from '@angular/material/timepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Eatery } from '../eatery/eatery';
import { Customer } from './customer';

@Component({
  selector: 'app-reservation',
  providers: [],
  imports: [
    FormsModule, 
    MatNativeDateModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTimepickerModule, 
    MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})

export class ReservationComponent implements OnInit {
  @Input() eatery: Eatery | undefined;
  @Input() customer: Customer | undefined;
  @Input() dateTime: Date | undefined;
  @Input() guestNumber: number | undefined;

  constructor(private route: ActivatedRoute) {}

  onSubmit() {
    console.log("DATETIME", this.dateTime);
    console.log("GUEST NUMBER", this.guestNumber);
    alert("Reservation clicked!")
      // TODO: connect to API create reservation
      // this.apiService.createReservation(eateryID, customerID, dateTime, guestNumber).subscribe(
      //   (data) => {
      //     // Handle successful login
      //     console.log('Reservation successful:', data);
      //   },
      //   (error) => {
      //     // Handle login failure
      //     console.error('Reservation failed:', error);
      //   }
      // );
    // }
  }

  ngOnInit() {
    // First get the eatery id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const eateryIdFromRoute = Number(routeParams.get('eateryId'));
    console.log("EATERY ID", eateryIdFromRoute);
  
    // TODO: Find the eatery that correspond with the id provided in route.
    // this.eatery = this.apiService.getEateries().find(eatery => eatery.id === eateryIdFromRoute);
  }
}
