import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CustomerViewModel } from "../model/customer";
import { Customer } from "./customer.service";
import { EateryManager } from "./eatery-manager.service";
import { EateryManagerViewModel } from "../model/eatery-manager";
@Injectable({ providedIn: 'root' })
export class AuthService {
    private customerBehaviorSubject = new BehaviorSubject<CustomerViewModel | undefined>(undefined);
    currentCustomer = this.customerBehaviorSubject.asObservable();

    private managerBehaviorSubject = new BehaviorSubject<EateryManagerViewModel | undefined>(undefined);
    currentManager = this.managerBehaviorSubject.asObservable();

    constructor() { }

    updateCustomer(customer: Customer | undefined) {
        this.customerBehaviorSubject.next(customer);
    }

    updateManager(manager: EateryManager | undefined) {
        this.managerBehaviorSubject.next(manager);
    }
}