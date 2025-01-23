import { ReservationViewModel } from "./reservation";

export interface CustomerViewModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    reservations?: ReservationViewModel[]; 
    payment?: string;
  }