import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    reservations: Reservation[];
}

export interface Reservation {
  id: number;
  customerId: number;
  eateryId: number;
  guestNumber: number;
  reservationDateTime: string;
  status: string;
}

export interface CustomerRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    payment: string;
}

const customerUrl: string = 'http://localhost:8080/api/customers'; // Customer-URL für das Backend

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${customerUrl}`);
  }

  // Get customer by ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${customerUrl}/${id}`);
  }

  // Create new customer
  createCustomer(customerRequest: CustomerRequest): Observable<Customer> {
    return this.http.post<Customer>(`${customerUrl}`, customerRequest);
  }

  // Update existing customer
  updateCustomer(id: number, customerRequest: CustomerRequest): Observable<Customer> {
    return this.http.put<Customer>(`${customerUrl}/${id}`, customerRequest);
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${customerUrl}/${id}`);
  }
}
