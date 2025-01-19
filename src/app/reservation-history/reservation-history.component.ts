import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { ReservationHistoryService } from '../services/reservation-history.service';
import { ReservationHistory } from '../model/reservation-history';



@Component({
  selector: 'app-reservation-history',
  imports: [CommonModule],
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  reservationHistories: ReservationHistory[] = [];
  dialog = inject(MatDialog);

  constructor(private reservationHistoryService: ReservationHistoryService) {}

  ngOnInit(): void {
    this.loadReservationHistory();
  }

  loadReservationHistory(): void {
    this.reservationHistoryService.getReservationHistory().subscribe({
      next: (data) => this.success(data),
      error: (error) => this.fail(error),
    });
  }

  success(data: ReservationHistory[]): void {
    this.reservationHistories = data;
    this.dialog.open(ReservationHistoryDialog, {
      data: { isSuccess: true, histories: this.reservationHistories },
    });
  }

  fail(error: any): void {
    console.error('Fehler beim Laden der Reservierungs-Historie:', error);
    this.dialog.open(ReservationHistoryDialog, {
      data: { isSuccess: false, error: error },
    });
  }
}

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class ReservationHistoryDialog {
  data = inject(MAT_DIALOG_DATA);
}
