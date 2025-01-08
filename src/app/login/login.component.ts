import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { firstName, lastName, phoneNumber, email } = this.loginForm.value;
      // TODO: connect to API create user
      // this.apiService.createUser(firstName, lastName, phoneNumber).subscribe(
      //   (data) => {
      //     // Handle successful login
      //     console.log('Login successful:', data);
      //   },
      //   (error) => {
      //     // Handle login failure
      //     console.error('Login failed:', error);
      //   }
      // );
    }
  }
}
