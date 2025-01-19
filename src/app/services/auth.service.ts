import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Customer } from "../model/customer";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private customerBehaviorSubject = new BehaviorSubject<Customer | undefined>(undefined);
    currentCustomer = this.customerBehaviorSubject.asObservable();

    constructor() { }

    updateCustomer(customer: Customer | undefined) {
        this.customerBehaviorSubject.next(customer);
    }
}