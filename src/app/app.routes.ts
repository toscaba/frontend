import { Routes } from '@angular/router';
import { EateryComponent } from "./eatery/eatery.component";
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
        { path: '', component: EateryComponent }, 
        { path: 'login', component: LoginComponent }
];
