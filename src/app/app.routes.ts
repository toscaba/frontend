import { Routes } from '@angular/router';
import { EateryComponent } from "./eatery/eatery.component";
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
        { path: '', component: EateryComponent }, 
        { path: 'login', component: LoginComponent },
        { path: 'eateries/:eateryId/reservation', component: ReservationComponent }
];
