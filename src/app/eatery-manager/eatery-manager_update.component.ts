import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { EateryManagerViewModel } from "../model/eatery-manager";
import { EateryManagerService, ManagerRequest } from "../services/eatery-manager.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdateEateryRequest } from "../services/eatery.service";

@Component({
  selector: 'app-eatery-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './eatery-manager_update.component.html',
  styleUrls: ['./eatery-manager_update.component.css']
})
export class EateryManagerUpdateComponent implements OnInit {
  managerViewModel: EateryManagerViewModel | undefined;
  
  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() username: string | undefined;
  @Input() password: string | undefined;
  @Input() jobTitle: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,  
    private managerService: EateryManagerService
  ) {
  }
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const managerIdFromRoute = Number(routeParams.get('managerId'));

    this.managerService.getManager(managerIdFromRoute).subscribe(manager => 
        this.managerViewModel = manager
    );
  }

  onUpdate() {
    if(!this.firstName || !this.lastName || !this.jobTitle || !this.username || !this.password) {
        alert('Fill in required fields marked with *')
        return;
    }

    let managerRequest: ManagerRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
        eateryId: this.managerViewModel?.eateryId ?? 0,
        jobTitle: this.jobTitle,
        workSchedules: this.managerViewModel?.workSchedules
    }

    if(this.managerViewModel != undefined) {
        this.managerService.updateManager(this.managerViewModel.id, managerRequest).subscribe(manager => {
            this.managerViewModel = manager;
            this.router.navigateByUrl('/managers/' + this.managerViewModel.id);
        });
    }
  }
}