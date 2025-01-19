import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
    id: number;
    customerId: number;
    eateryId: number;
    guestNumber: number;
    reservationDateTime: string;
    status: string;
  }

  export interface CreateReservationRequest {
    customerId: number;
    eateryId: number;
    guestNumber: number;
    reservationDateTime: string;
  }

  export interface UpdateReservationRequest {
    guestNumber: number;
    reservationDateTime: string;
  }

  const reservationUrl: string = 'http://localhost:8080/api/reservations'; // Reservation-URL für das Backend

  @Injectable({
    providedIn: 'root'
  })
  export class ReservationService {
    constructor(private http: HttpClient) { }
  
    // Get reservation by id
    getReservation(id: number) {
      return this.http.get<Reservation>(`${reservationUrl}/${id}`);
    }
  
    // Get all reservations
    getReservations() {
      return this.http.get<Reservation>(`${reservationUrl}`);
    }
  
    // Create new reservation
    createReservation(reservationRequest: CreateReservationRequest): Observable<Reservation> {
      return this.http.post<Reservation>(`${reservationUrl}`, reservationRequest);
    }

    // Update existing reservation
    updateReservation(id: number, reservationRequest: UpdateReservationRequest): Observable<Reservation> {
        return this.http.put<Reservation>(`${reservationUrl}/${id}`, reservationRequest);
    }

    // Cancel existing reservation
    cancelReservation(id: number): Observable<Reservation> {
      return this.http.put<Reservation>(`${reservationUrl}/${id}/cancel`,{});
    }
  }