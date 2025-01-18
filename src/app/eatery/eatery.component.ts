import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eatery } from '../eatery/eatery';
import { Router } from '@angular/router';
import { EateryService } from '../services/api.service';
import { Customer } from '../customer/customer';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-eatery',
  imports: [CommonModule],
  templateUrl: './eatery.component.html',
  styleUrls: ['./eatery.component.css']
})
export class EateryComponent implements OnInit {
  customer: Customer | undefined;
  eateries: Eatery[] | undefined;

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
