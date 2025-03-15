import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EateryViewModel } from '../model/eatery';
import { Router } from '@angular/router';
import { EateryService } from '../services/eatery.service';
import { ConnectionService } from '../services/api.service';
import { CustomerViewModel } from '../model/customer';
import { AuthService } from '../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-eatery',
  imports: [CommonModule, MatDividerModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './eatery.component.html',
  styleUrl: './eatery.component.css'
})
export class EateryComponent implements OnInit {

  isServerRunning: boolean = false;
  customer: CustomerViewModel | undefined;
  eateries: EateryViewModel[] | undefined;

  chips = [
    { name: 'Restaurant', selected: false },
    { name: 'Bar', selected: false },
    { name: 'Cafe', selected: false }
  ];

  constructor(
    private router: Router,
    private eateryService: EateryService,
    private authService: AuthService,
    private connectionService: ConnectionService) {
  }

  ngOnInit(): void {
    this.connectionService.currentState.subscribe(isServerRunning => this.isServerRunning = isServerRunning);
    this.authService.currentCustomer.subscribe(customer => this.customer = customer);
    this.eateryService?.getEateries().subscribe({
      next: eateries => this.eateries = eateries,
      error: e => this.serverError(e)
    });
  }

  toggleSelection(index: number): void {
    const chip = this.chips[index];
    // Toggle the 'selected' state of a chip
    chip.selected = !chip.selected;
    if(chip.selected == false) {
      this.eateryService?.getEateries().subscribe(eateries => this.eateries = eateries)
    }
  }

  filter(eateryType: string) {
    this.eateryService.search(eateryType).subscribe(eateries => this.eateries = eateries)
  }

  reserve(eateryID: number) {
    this.router.navigateByUrl('/eateries/' + eateryID + '/reservation');
  }

  review(eateryID: number) {
    this.router.navigateByUrl('/eateries/' + eateryID + '/review');
  }

  serverError(error: HttpErrorResponse) {
    // The backend returned an unsuccessful response code if status != 0.
    // The response body may contain clues as to what went wrong.
    const networkError = error.status == 0; 
    this.connectionService.updateState(networkError);
  }
}
