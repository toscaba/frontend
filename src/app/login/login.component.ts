import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  router: Router;
  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() email: string | undefined;
  @Input() payment: string | undefined;

  constructor(private _router: Router) {
    this.router = _router;
  }

  onSubmit() {
    if (!this.firstName || !this.lastName || !this.phoneNumber || !this.email || !this.payment) {
      console.error('Bitte alle Felder ausfüllen.');
      return;
    }
    
    console.log('Daten:', {
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      payment: this.payment,
    });
      // TODO: connect to API create user
      // this.apiService.createCustomer(firstName, lastName, phoneNumber).subscribe(
      //   (customer) => {
      //     // Handle successful login
      //     console.log('Login successful:', customer);
      //   },
      //   (error) => {
      //     // Handle login failure
      //     console.error('Login failed:', error);
      //   }
      // );
      // const customer: Customer = {id: 1, firstName, lastName: this.lastName?, phoneNumber, email, payment: 'CASH'};
      // this.router.navigateByUrl('/profile/'+ customer.id);
      this.router.navigateByUrl('/profile/'+ 1);
    // }
  }
}
