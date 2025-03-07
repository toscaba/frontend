import { Review } from "../services/customer.service";
import { ReservationViewModel } from "./reservation";
import { ReviewViewModel } from "./review";

export interface CustomerViewModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    phoneNumber: string;
    reservations?: ReservationViewModel[]; 
    reviews?: ReviewViewModel[];
  }