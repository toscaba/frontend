import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Customer } from '../customer/customer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
    // this.loginForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   phoneNumber: ['', Validators.required]
    // });
  }

  onSubmit() {
    // if (this.loginForm.valid) {
      // const { firstName, lastName, phoneNumber, email } = this.loginForm.value;
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
      console.log("FIRST NAME", this.firstName);
      console.log("LAST NAME", this.lastName);
      console.log("PHONE", this.phoneNumber);
      console.log("EMAIL", this.email);
      console.log("PAYMENT", this.payment);
      // const customer: Customer = {id: 1, firstName, lastName: this.lastName?, phoneNumber, email, payment: 'CASH'};
      // this.router.navigateByUrl('/profile/'+ customer.id);
      this.router.navigateByUrl('/profile/'+ 1);
    // }
  }
}
