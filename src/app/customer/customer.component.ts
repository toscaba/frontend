import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer';
import { CustomerService } from '../services/api.service';

@Component({
  selector: 'app-customer',
  imports: [CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  customer: Customer | undefined;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) {
    }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const customerIdFromRoute = Number(routeParams.get('customerId'));

    this.customerService?.getCustomer(customerIdFromRoute).subscribe(customer => {
      this.customer = customer;
    });
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
