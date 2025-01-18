import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'; // Importiere CommonModule
import { Customer } from '../customer/customer';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../api.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTabsModule], // Füge CommonModule hier hinzu
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private customer: Customer | undefined;
  enableLogin: boolean = true;
  enableRegister: boolean = false;

  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() email: string | undefined;
  @Input() payment: string | undefined;

  @Input() username: string | undefined;

  constructor(private router: Router,
    private authService: AuthService,
    private customerService: CustomerService) { }

  ngOnInit(): void {
    this.authService.currentCustomer.subscribe(customer => {
      this.customer = customer;
      if (this.customer) {
        this.router.navigateByUrl('/profile/' + this.customer?.id);
      }
    });
  }

  onSubmit() {
    if (this.enableLogin == true) {
      this.customerService.getCustomer(Number(this.username)).subscribe(customer => {
        this.authService.updateCustomer(customer);
      });
    } else {
      if (this.customer != undefined) {
        this.customerService.createCustomer(this.customer).subscribe(customer => this.customer = customer);
      }
    }
  }
}
