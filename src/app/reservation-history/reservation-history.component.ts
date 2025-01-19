import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-history',
  imports: [],
  templateUrl: './reservation-history.component.html',
  styleUrl: './reservation-history.component.css'
})
export class ReservationHistoryComponent implements OnInit {
  reservationHistories: ReservationHistory[] = [];

  constructor(private reservationHistoryService: ReservationHistoryService) {}

  ngOnInit(): void {
    this.loadReservationHistory();
  }

  loadReservationHistory(): void {
    this.reservationHistoryService.getReservationHistory().subscribe(
      (data) => {
        this.reservationHistories = data;
      },
      (error) => {
        console.error('Fehler beim Laden der Reservierungs-Historie:', error);
      }
    );
  }
}