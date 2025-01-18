import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../customer/customer';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
  customer: Customer | undefined;
  dialog = inject(MatDialog);
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentCustomer.subscribe(customer => this.customer = customer);
  }

  logout() {
    this.authService.updateCustomer(undefined);
    this.router.navigateByUrl('/');
    this.dialog.open(Dialog, { data: {} });
  }
}

@Component({
  selector: 'app-top-bar',
  templateUrl: '../login/dialog_logout.component.html',
  imports: [MatDialogTitle, MatDialogContent]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}
