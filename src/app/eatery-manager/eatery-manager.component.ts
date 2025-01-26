import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EateryManagerService } from '../services/eatery-manager.service';
import { ReservationService, Reservation } from '../services/reservation.service';
import { Eatery } from '../services/eatery.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReservationHistoryDialog } from '../reservation-history-dialog/reservation-history-dialog.component'; // Importiere den Dialog


@Component({
  selector: 'app-eatery-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eatery-manager.component.html',
  styleUrls: ['./eatery-manager.component.css'],
})
export class EateryManagerComponent implements OnInit {
  // Da kein Manager direkt geladen wird, können wir hier eine einfache Struktur nutzen
  managerId: number = 0; 
  eateries: Eatery[] = [];
  reservations: Reservation[] = [];
  selectedEatery: Eatery | undefined;
  dialog = inject(MatDialog);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eateryManagerService: EateryManagerService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.managerId = Number(this.route.snapshot.paramMap.get('id')); // Manager-ID aus der URL
    this.loadEateries(); // Lade Gastronomieeinrichtungen des Managers
  }

  private loadEateries(): void {
    // Hole alle Gastronomieeinrichtungen, eventuell nach Manager filtern, wenn verfügbar
    this.eateryManagerService.getAllEateries().subscribe((eateries: any[]) => {
      this.eateries = eateries.filter((eatery) => eatery.managerId === this.managerId); // Optional: Filter nach Manager-ID
    });
  }

  addEatery(): void {
    const newEatery: Eatery = {
      id: 0,
      type: 'Restaurant', // Default-Wert anpassen, falls erforderlich
      name: '',
      address: '',
      guestCapacity: 0,
      managerId: 0,
      openingHours: undefined
    };
    this.eateries.push(newEatery);
  }

  saveEatery(eatery: Eatery): void {
    if (eatery.id === 0) {
      this.eateryManagerService.createNewEatery(eatery).subscribe(() => {
        alert('Gastronomieeinrichtung erstellt!');
        this.loadEateries(); // Aktualisiere die Liste nach dem Speichern
      });
    } else {
      this.eateryManagerService.updateExistingEatery(eatery.id, eatery).subscribe(() => {
        alert('Gastronomieeinrichtung aktualisiert!');
        this.loadEateries(); // Aktualisiere die Liste nach dem Speichern
      });
    }
  }

  deleteEatery(eateryId: number): void {
    this.eateryManagerService.deleteEateryById(eateryId).subscribe(() => {
      this.eateries = this.eateries.filter((e) => e.id !== eateryId);
      alert('Gastronomieeinrichtung gelöscht!');
    });
  }

  loadReservations(eateryId: number): void {
    this.reservationService.getReservationsByEatery(eateryId).subscribe((reservations) => {
      this.reservations = reservations;
      this.selectedEatery = this.eateries.find((e) => e.id === eateryId);
    });
  }

  markAsCompleted(reservationId: number): void {
    this.reservationService.completeReservation(reservationId).subscribe((updatedReservation) => {
      this.reservations = this.reservations.map((res) =>
        res.id === reservationId ? updatedReservation : res
      );
      alert('Reservierung als abgeschlossen markiert!');
    });
  }

  deleteReservation(reservationId: number): void {
    this.reservationService.deleteReservation(reservationId).subscribe(() => {
      this.reservations = this.reservations.filter((res) => res.id !== reservationId);
      alert('Reservierung gelöscht!');
    });
  }

  viewReservationHistory(eateryId: number): void {
    this.reservationService.getReservationHistory(eateryId).subscribe((history) => {
      this.dialog.open(ReservationHistoryDialog, {
        data: { history },
      });
    });
  }
}
