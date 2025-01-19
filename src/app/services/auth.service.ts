import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomerViewModel } from "../model/customer";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private customerBehaviorSubject = new BehaviorSubject<CustomerViewModel | undefined>(undefined);
    currentCustomer = this.customerBehaviorSubject.asObservable();

    constructor() { }

    updateCustomer(customer: CustomerViewModel | undefined) {
        this.customerBehaviorSubject.next(customer);
    }
}