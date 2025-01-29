import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EateryService, Eatery, EateryRequest } from './eatery.service';

@Injectable({
  providedIn: 'root',
})
export class EateryManagerService {
  constructor(private eateryService: EateryService) {}

  // Get all eateries (delegation to EateryService)
  getAllEateries(): Observable<Eatery[]> {
    return this.eateryService.getEateries();
  }

  // Get eatery by ID (delegation to EateryService)
  getEateryById(eateryId: number): Observable<Eatery> {
    return this.eateryService.getEatery(eateryId);
  }

  // Create a new eatery
  createNewEatery(eatery: EateryRequest): Observable<Eatery> {
    return this.eateryService.createEatery(eatery);
  }

  // Update an existing eatery
  updateExistingEatery(eateryId: number, eatery: EateryRequest): Observable<Eatery> {
    return this.eateryService.updateEatery(eateryId, eatery);
  }

  // Delete an eatery by ID
  deleteEateryById(eateryId: number): Observable<void> {
    return this.eateryService.deleteEatery(eateryId);
  }
}