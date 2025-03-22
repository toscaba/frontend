import { Routes } from '@angular/router';
import { EateryComponent } from "./eatery/eatery.component";
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationUpdateComponent } from './reservation-update/reservation-update.component';
import { CustomerComponent } from './customer/customer.component';
import { EateryManagerComponent } from './eatery-manager/eatery-manager.component';
import { ReviewComponent } from './review/review.component';
import { CustomerUpdateComponent } from './customer/customer-update.component';
import { EateryManagerUpdateComponent } from './eatery-manager/eatery-manager_update.component';


export const routes: Routes = [
        { path: '', component: EateryComponent },
        { path: 'customer/:customerId/eateries', component: EateryComponent },
        { path: 'login', component: LoginComponent },
        { path: 'eateries/:eateryId/reservation', component: ReservationComponent },
        { path: 'eateries/:eateryId/review', component: ReviewComponent },
        { path: 'profile/:customerId', component: CustomerComponent },
        { path: 'profile/:customerId/edit', component: CustomerUpdateComponent},
        { path: 'managers/:id', component: EateryManagerComponent },
        { path: 'managers/:managerId/edit', component: EateryManagerUpdateComponent },
        { path: 'reservations/:reservationId', component: ReservationUpdateComponent }
];
