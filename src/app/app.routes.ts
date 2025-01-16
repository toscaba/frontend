import { Routes } from '@angular/router';
import { EateryComponent } from "./eatery/eatery.component";
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CustomerComponent } from './customer/customer.component';
import { EateryManagerComponent } from './eatery-manager/eatery-manager.component';

export const routes: Routes = [
        { path: '', component: EateryComponent }, 
        { path: 'login', component: LoginComponent },
        { path: 'eateries/:eateryId/reservation', component: ReservationComponent },
        { path: 'profile/:customerId', component: CustomerComponent },     
        { path: 'managers/:id', component: EateryManagerComponent }   
];
