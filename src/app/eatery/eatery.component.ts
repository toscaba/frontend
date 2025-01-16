import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Eatery } from '../eatery/eatery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eatery',
  imports: [CommonModule],
  templateUrl: './eatery.component.html',
  styleUrls: ['./eatery.component.css']
})
export class EateryComponent {
  router: Router;
  eateries: Eatery[];
  
  constructor(private _router: Router) {
    this.router = _router;
    this.eateries = [
      { id: 1, name: 'Block House', type: 'RESTAURANT', address: 'Jungfernstieg 1, 20095 Hamburg', phoneNumber: '040 123 456', email: 'service@restaurant-1.com', businessDayTimes: [{openDay: 'MONDAY', openTime: '18:00', closeTime: '23:00'}] },
      { id: 2, name: 'Tapas Locas', type: 'BAR', address: 'Textorstraße 14, 60594', phoneNumber: '069 123 456', email: 'hello@bar-1.de', businessDayTimes: [{openDay: 'SATURDAY', openTime: '18:00', closeTime: '23:59'}, {openDay: 'SUNDAY', openTime: '00:00', closeTime: '04:00'}] },
      { id: 3, name: 'Café Fleury', type: 'CAFE', address: 'Weinbergsweg 20, 10119 Berlin', phoneNumber: '030 123 456', email: 'kontakt@cafe-1.com', businessDayTimes: [{openDay: 'FRIDAY', openTime: '07:00', closeTime: '15:00'}] }
    ];
    // TODO get eateries from API service
    // this.eateries = this.apiService.getEateries();
  }

  reserve(eateryID: number) {
    this.router.navigateByUrl('/eateries/'+ eateryID + '/reservation');
  }
}
