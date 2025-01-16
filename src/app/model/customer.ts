import { Reservation } from "./reservation";

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    reservations?: Reservation[]; 
    payment: string;
  }