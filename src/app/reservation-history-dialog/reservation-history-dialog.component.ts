import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialog-Komponente für die Reservierungshistorie
@Component({
  selector: 'app-reservation-history-dialog',
  templateUrl: './reservation-history-dialog.component.html',
  styleUrls: ['./reservation-history-dialog.component.css']
})
export class ReservationHistoryDialog {
  // Die Daten werden durch den Dialog übergeben
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
