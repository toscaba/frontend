import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomerViewModel } from "../model/customer";
import { Customer } from "./customer.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private customerBehaviorSubject = new BehaviorSubject<CustomerViewModel | undefined>(undefined);
    currentCustomer = this.customerBehaviorSubject.asObservable();

    constructor() { }

    updateCustomer(customer: Customer | undefined) {
        this.customerBehaviorSubject.next(customer);
    }
}