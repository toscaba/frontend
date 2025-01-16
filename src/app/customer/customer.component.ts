import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  router: Router;
  customer: Customer;

  constructor(private route: ActivatedRoute, private _router: Router) {
    this.router = _router;
    const routeParams = this.route.snapshot.paramMap;
    const customerIdFromRoute = Number(routeParams.get('customerId'));
    // TODO: Find the customer that correspond with the id provided in route.
    // this.customer = this.apiService.getCustomer(customerIdFromRoute);
    this.customer = {id: 1, firstName: 'Max', lastName: 'Mustermann', phoneNumber: '030 123 456 789', email: 'mustermann@test.de', payment: 'CASH'};
    console.log("CUSTOMER ID", customerIdFromRoute);
  }

  cancelReservation(reservationId: number) {
    console.log("RESERVATION ID", reservationId);
    // TODO: cancel reservation via api service
    // this.apiService.cancelReservation(reservationId);
  }

  updateReservation(reservationId: number) {
    this.router.navigateByUrl('/reservations/' + reservationId);
  }
}
