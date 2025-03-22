import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { CustomerViewModel } from "../model/customer";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CustomerRequest, CustomerService } from "../services/customer.service";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './customer_update.component.html',
  styleUrl: './customer_update.component.css'
})
export class CustomerUpdateComponent implements OnInit {
    customerViewModel: CustomerViewModel | undefined;

    @Input() firstName: string | undefined;
    @Input() lastName: string | undefined;
    @Input() phoneNumber: string | undefined;
    @Input() username: string | undefined;
    @Input() password: string | undefined;    

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService,
    ) {
    }

    ngOnInit(): void {
        const routeParams = this.route.snapshot.paramMap;
        const customerIdFromRoute = Number(routeParams.get('customerId'));

        this.customerService.getCustomer(customerIdFromRoute).subscribe(customer =>
            this.customerViewModel = customer
        );
    }

    onUpdate() {
        if(!this.firstName || !this.lastName || !this.phoneNumber || !this.username || !this.password) {
            alert('Fill in required fields marked with *')
            return;
        }

        let customerRequest: CustomerRequest = {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.password,
            phoneNumber: this.phoneNumber
        }

        if(this.customerViewModel != undefined) {
            this.customerService?.updateCustomer(this.customerViewModel?.id, customerRequest).subscribe(customer => {
                this.customerViewModel = customer;
                this.router.navigateByUrl('/profile/' + this.customerViewModel?.id);
            });
        }
    }
    
}
