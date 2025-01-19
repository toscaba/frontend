import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EateryViewModel } from '../model/eatery';
import { Router } from '@angular/router';
import { EateryService } from '../services/eatery.service';
import { CustomerViewModel } from '../model/customer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eatery',
  imports: [CommonModule],
  templateUrl: './eatery.component.html',
  styleUrl: './eatery.component.css'
})
export class EateryComponent implements OnInit {
  customer: CustomerViewModel | undefined;
  eateries: EateryViewModel[] | undefined;

  constructor(private router: Router, private eateryService: EateryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentCustomer.subscribe(customer => this.customer = customer);
    this.eateryService?.getEateries().subscribe(eateries => {
      this.eateries = eateries;
    });
  }

  reserve(eateryID: number) {
    this.router.navigateByUrl('/eateries/' + eateryID + '/reservation');
  }
}
