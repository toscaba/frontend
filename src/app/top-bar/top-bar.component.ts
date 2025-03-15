import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerViewModel } from '../model/customer';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { EateryManagerViewModel } from '../model/eatery-manager';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule, RouterLink, MatMenuModule, MatButtonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit {
  customer: CustomerViewModel | undefined;
  manager: EateryManagerViewModel | undefined;
  dialog = inject(MatDialog);
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentCustomer.subscribe(customer => this.customer = customer);
    this.authService.currentManager.subscribe(manager => this.manager = manager);
  }

  profile() {
    this.router.navigateByUrl('/profile/' + this.customer?.id);
  }

  managerProfile() {
    this.router.navigateByUrl('/managers/' + this.manager?.id)
  }

  logout() {
    this.authService.updateCustomer(undefined);
    this.authService.updateManager(undefined);
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
