import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eatery } from '../model/eatery';
import { Router } from '@angular/router';
import { ConnectionService, EateryService } from '../services/api.service';
import { Customer } from '../model/customer';
import { AuthService } from '../services/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-eatery',
  imports: [CommonModule, MatDividerModule, MatCardModule],
  templateUrl: './eatery.component.html',
  styleUrl: './eatery.component.css'
})
export class EateryComponent implements OnInit {
  isServerRunning: boolean = false;
  customer: Customer | undefined;
  eateries: Eatery[] | undefined;

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

  reserve(eateryID: number) {
    this.router.navigateByUrl('/eateries/' + eateryID + '/reservation');
  }

  serverError(error: HttpErrorResponse) {
    // The backend returned an unsuccessful response code if status != 0.
    // The response body may contain clues as to what went wrong.
    const networkError = error.status == 0; 
    this.connectionService.updateState(networkError);
  }
}
