import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EateryManagerService } from '../services/eatery-manager.service';
import { EateryManagerViewModel } from '../model/eatery-manager'
import { EateryService } from '../services/eatery.service';
import { EateryViewModel } from '../model/eatery';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

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
        console.log(eatery);
        this.eateryViewModel = eatery;
        this.type = eatery.type;
        this.address = eatery.address;
        this.phonenumber = eatery.phoneNumber;
        this.email = eatery.email;
      });
    });
  }
}
