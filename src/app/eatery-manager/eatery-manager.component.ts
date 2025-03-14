import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EateryManagerService } from '../services/eatery-manager.service';
import { EateryManagerViewModel } from '../model/eatery-manager'
import { EateryRequest, EateryService } from '../services/eatery.service';
import { EateryViewModel } from '../model/eatery';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-eatery-manager',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatTabsModule, FormsModule],
  templateUrl: './eatery-manager.component.html',
  styleUrls: ['./eatery-manager.component.css']
})
export class EateryManagerComponent implements OnInit {
  managerViewModel: EateryManagerViewModel | undefined;
  eateryViewModel: EateryViewModel | undefined;
  dialog = inject(MatDialog);

  @Input() type: string | undefined;
  @Input() address: string | undefined;
  @Input() phonenumber: string | undefined;
  @Input() email: string | undefined;

  constructor(private route: ActivatedRoute,
    private eateryManagerService: EateryManagerService,
    private eateryService: EateryService) { }

  ngOnInit(): void {
    const managerIdFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.eateryManagerService?.getManager(managerIdFromRoute).subscribe(manager => {
      this.managerViewModel = manager;
      this.eateryService.getEatery(this.managerViewModel.eateryId).subscribe(eatery => {
        this.eateryViewModel = eatery;
        this.type = eatery.type;
        this.address = eatery.address;
        this.phonenumber = eatery.phoneNumber;
        this.email = eatery.email;
      });
    });
  }

  onSubmit() {
    if(this.managerViewModel?.eateryId === 0 || !this.type || !this.address || !this.phonenumber || !this.email) {
      alert('Fill in required fields marked with *')
      return;
    }

    let eateryRequest: EateryRequest = {
      type: this.type,
      name: this.eateryViewModel?.name ?? "",
      address: this.address,
      email: this.email,
      phoneNumber: this.phonenumber,
      guestCapacity: this.eateryViewModel?.guestCapacity ?? 0,
      businessDayTimes: this.eateryViewModel?.businessDayTimes
    }

    if (!this.managerViewModel) {
      alert('Your managed eatery is not found')
      return;
    }
    this.eateryService.updateEatery(this.managerViewModel.eateryId, eateryRequest).subscribe({
      next: (updatedEatery) => this.success(updatedEatery),
      error: (e) => this.fail(e)
    })
  }

  success(updatedEatery: EateryViewModel) {
    this.eateryViewModel = updatedEatery;
    this.type = updatedEatery.type;
    this.address = updatedEatery.address;
    this.phonenumber = updatedEatery.phoneNumber;
    this.email = updatedEatery.email;
    this.dialog.open(Dialog, { data: { isSuccess: true, eatery: this.eateryViewModel } })
  }

  fail(e: any) {
    alert('Fail to update')
  }
}

@Component({
  selector: 'app-eatery-manager',
  templateUrl: './eatery-update_dialog.component.html',
  imports: [MatDialogTitle, MatDialogContent, CommonModule]
})
export class Dialog {
  data = inject(MAT_DIALOG_DATA);
}