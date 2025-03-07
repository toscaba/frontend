import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Eatery {
  id: number;
  type: string;
  name: string;
  address: string;
  email?: string;
  phoneNumber?: string;
  guestCapacity: number;
  businessDayTimes?: BusinessDayTime[];
  rating: number;
  reviews: Review[];
}

export interface EateryRequest {
    type: string;
    name: string;
    address: string;
    email?: string;
    phoneNumber?: string;
    guestCapacity: number;
    businessDayTimes?: BusinessDayTime[];
  }

export interface BusinessDayTime {
    day: string;
    startTime: string;
    endTime: string;
}

export interface Review {
  id: number;
  eateryId: number;
  customerId: number;
  message: string;
  rating: number;
}

const eateryUrl: string = 'http://localhost:8080/api/eateries'; // Eatery-URL für das Backend

@Injectable({
  providedIn: 'root'
})
export class EateryService {
  constructor(private http: HttpClient) { }

  // Get all eateries
  getEateries(): Observable<Eatery[]> {
    return this.http.get<Eatery[]>(`${eateryUrl}`);
  }

  // Get eatery by ID
  getEatery(id: number): Observable<Eatery> {
    return this.http.get<Eatery>(`${eateryUrl}/${id}`);
  }

  // Create new eatery
  createEatery(eatery: EateryRequest): Observable<Eatery> {
    return this.http.post<Eatery>(`${eateryUrl}`, eatery);
  }

  // Update existing eatery
  updateEatery(id: number, eatery: EateryRequest): Observable<Eatery> {
    return this.http.put<Eatery>(`${eateryUrl}/${id}`, eatery);
  }

  // Delete eatery
  deleteEatery(id: number): Observable<void> {
    return this.http.delete<void>(`${eateryUrl}/${id}`);
  }
}
