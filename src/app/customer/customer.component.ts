import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customer: Customer;

  constructor(private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    const customerIdFromRoute = Number(routeParams.get('customerId'));
    // TODO: Find the customer that correspond with the id provided in route.
    // this.customer = this.apiService.getCustomer(customerIdFromRoute);
    this.customer = {id: 1, firstName: 'Max', lastName: 'Mustermann', phoneNumber: '030 123 456 789', email: 'mustermann@test.de', payment: 'CASH'};
    console.log("CUSTOMER ID", customerIdFromRoute);
  }
}
