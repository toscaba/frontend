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

const reservationUrl: string = 'http://localhost:8080/api/reservations'; // Backend-URL für Reservierungen

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor(private http: HttpClient) {}

  // Get reservation by ID
  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${reservationUrl}/${id}`);
  }

  // Get all reservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${reservationUrl}`);
  }

  // Get reservations by eatery ID (specific to an eatery manager)
  getReservationsByEatery(eateryId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${reservationUrl}/eatery/${eateryId}`);
  }

  // Create a new reservation
  createReservation(
    reservationRequest: CreateReservationRequest
  ): Observable<Reservation> {
    return this.http.post<Reservation>(`${reservationUrl}`, reservationRequest);
  }

  // Update an existing reservation
  updateReservation(
    id: number,
    reservationRequest: UpdateReservationRequest
  ): Observable<Reservation> {
    return this.http.put<Reservation>(`${reservationUrl}/${id}`, reservationRequest);
  }

  // Cancel an existing reservation
  cancelReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${reservationUrl}/${id}/cancel`, {});
  }

  // Mark a reservation as completed
  completeReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${reservationUrl}/${id}/complete`, {});
  }

  // Delete a completed reservation
  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${reservationUrl}/${id}`);
  }

  // Get reservation history for an eatery
  getReservationHistory(eateryId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${reservationUrl}/history/${eateryId}`);
  }
}
