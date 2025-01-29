import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservationHistory {
  id: number;
  reservationId: number;
  customerId: number;
  eateryId: number;
  reservationDateTime: string;
  guestNumber: number;
  status: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationHistoryService {
  private apiUrl = 'http://localhost:8080/api/reservation-history'; 

  constructor(private http: HttpClient) {}

  getReservationHistory(): Observable<ReservationHistory[]> {
    return this.http.get<ReservationHistory[]>(this.apiUrl);
  }
}
