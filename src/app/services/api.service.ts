import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EateryManager } from '../model/eatery-manager';

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

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api/'; // Basis-URL für das Backend

  constructor(private http: HttpClient) {}

  getAllEateryManagers(): Observable<EateryManager[]> {
    return this.http.get<EateryManager[]>(`${this.apiUrl}/managers`);
  }

  getEateryManager(id: number): Observable<EateryManager> {
    return this.http.get<EateryManager>(`${this.apiUrl}/managers/${id}`);
  }

  createEateryManager(manager: EateryManager): Observable<EateryManager> {
    return this.http.post<EateryManager>(`${this.apiUrl}/managers`, manager);
  }

  updateEateryManager(id: number, manager: EateryManager): Observable<EateryManager> {
    return this.http.put<EateryManager>(`${this.apiUrl}/managers/${id}`, manager);
  }

  deleteEateryManager(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/managers/${id}`);
  }

  // Login
  createUser(firstName: string, lastName: string, phoneNumber: string): Observable<any> {
    return this.http.post(this.apiUrl, { firstName, lastName, phoneNumber });
  }

  // Eateries

  // Get all eateries
  getEateries(): Observable<Eatery[]> {
    return this.http.get<Eatery[]>(`${this.apiUrl}eateries`);
  }

  // Get eatery by ID
  getEatery(id: number): Observable<Eatery> {
    return this.http.get<Eatery>(`${this.apiUrl}eateries/${id}`);
  }

  // Create new eatery
  createEatery(eatery: Eatery): Observable<Eatery> {
    return this.http.post<Eatery>(`${this.apiUrl}eateries`, eatery);
  }

  // Update existing eatery
  updateEatery(id: number, eatery: Eatery): Observable<Eatery> {
    return this.http.put<Eatery>(`${this.apiUrl}eateries/${id}`, eatery);
  }

  // Delete eatery
  deleteEatery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}eateries/${id}`);
  }

  // Customers

  // Get all customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}customers`);
  }

  // Get customer by ID
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}customers/${id}`);
  }

  // Create new customer
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}customers`, customer);
  }

  // Update existing customer
  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}customers/${id}`, customer);
  }

  // Delete customer
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}customers/${id}`);
  }
}
