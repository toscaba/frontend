import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'; // Importiere CommonModule
import { Customer } from '../customer/customer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule], // Füge CommonModule hier hinzu
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

    this.router.navigateByUrl('/profile/' + 1);
  }
}
