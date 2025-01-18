import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Beispiel-Datenmodelle (passt sie je nach Bedarf an)
export interface Eatery {
  id: number;
  type: string;
  name: string;
  address: string;
  email?: string;
  phoneNumber?: string;
  guestCapacity: number;
  businessDayTimes?: BusinessDayTime[];
}

export interface BusinessDayTime {
  openDay: string;
  openTime: string;
  closeTime: string;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface EateryManager {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  workSchedules: string[];
}

export interface Reservation {
  customerId: number;
  eateryId: number;
  guestNumber: number;
  reservationDateTime: string;
  status: string;
}

const apiUrl: string = 'http://localhost:8080/api/'; // Basis-URL für das Backend

@Injectable({
  providedIn: 'root'
})
export class EateryService {
  constructor(private http: HttpClient) { }

  // Get all eateries
  getEateries(): Observable<Eatery[]> {
    return this.http.get<Eatery[]>(`${apiUrl}eateries`);
  }

  // Get eatery by ID
  getEatery(id: number): Observable<Eatery> {
    return this.http.get<Eatery>(`${apiUrl}eateries/${id}`);
  }

  // Create new eatery
  createEatery(eatery: Eatery): Observable<Eatery> {
    return this.http.post<Eatery>(`${apiUrl}eateries`, eatery);
  }

  // Update existing eatery
  updateEatery(id: number, eatery: Eatery): Observable<Eatery> {
    return this.http.put<Eatery>(`${apiUrl}eateries/${id}`, eatery);
  }

  // Delete eatery
  deleteEatery(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}eateries/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  // Get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${apiUrl}customers`);
  }

  // Get customer by ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${apiUrl}customers/${id}`);
  }

  // Create new customer
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${apiUrl}customers`, customer);
  }

  // Update existing customer
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${apiUrl}customers/${id}`, customer);
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${apiUrl}customers/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class EateryManagerService {
  constructor(private http: HttpClient) { }

  // Get manager
  getManager(id: number) {
    return this.http.get<EateryManager>(`${apiUrl}managers/${id}`);
  }

  getManagers() {
    return this.http.get<EateryManager[]>(`${apiUrl}managers`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient) { }

  // Get reservation by id
  getReservation(id: number) {
    return this.http.get<Reservation>(`${apiUrl}reservations/${id}`);
  }

  // Get all reservations
  getReservations() {
    return this.http.get<Reservation>(`${apiUrl}reservations`);
  }

  // Create new reservation
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${apiUrl}reservations`, reservation);
  }
}