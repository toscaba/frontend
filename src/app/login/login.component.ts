import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CustomerViewModel } from '../model/customer';
import { AuthService } from '../services/auth.service';
import { CustomerService, CustomerRequest } from '../services/customer.service';
import { MatTabsModule, MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatDialog, MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTabsModule, MatTab, MatTabGroup],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private customerViewModel: CustomerViewModel | undefined;
  enableLogin: boolean = true;
  dialog = inject(MatDialog);

  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() email: string | undefined;
  @Input() payment: string | undefined;
  @Input() username: string | undefined;
  @Input() password: string | undefined;

  constructor(private router: Router, private authService: AuthService, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.authService.currentCustomer.subscribe(customer => {
      this.customerViewModel = customer;
      if (this.customerViewModel) {
        this.router.navigateByUrl('/profile/' + this.customerViewModel?.id);
      }
    });
  }

  onLogin() {
    if (this.enableLogin == true && this.username != undefined && this.password != undefined) {
      this.customerService.login(this.username, this.password).subscribe({
        next: (customer) => { this.authService.updateCustomer(customer); },
        error: () => { this.dialog.open(Dialog); }
      });
    } else if (this.customerViewModel != undefined) {
      this.customerService.getCustomer(this.customerViewModel.id).subscribe(customer => this.authService.updateCustomer(customer));
    }
  }

  onRegister() {
    if(!this.firstName || !this.lastName || !this.phoneNumber || !this.email || !this.payment) {
      alert('Fill in required fields marked with *')
      return;
    }

    let customerRequest: CustomerRequest = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      payment: this.payment
    };
    
    this.customerService.createCustomer(customerRequest).subscribe(customer => this.authService.updateCustomer(customer));
  }
}

@Component({
  selector: 'app-reservation',
  templateUrl: './dialog_login.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}
