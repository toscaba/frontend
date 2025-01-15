import { Component } from '@angular/core';
import { ApiService, Customer } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  email: string = '';
  payment: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    const newCustomer: Customer = {
      id: 0, // Backend generiert die ID
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber
    };

    this.apiService.createCustomer(newCustomer).subscribe({
      next: (customer) => {
        console.log('Customer created:', customer);
        alert('Customer created successfully!');
        this.router.navigateByUrl(`/profile/${customer.id}`);
      },
      error: (err) => {
        console.error('Error creating customer:', err);
        alert('Error creating customer. Please try again.');
      }
    });
  }
}
