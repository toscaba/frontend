import { Review } from "../services/eatery.service";
import { BusinessDayTimeViewModel } from "./business-day-time";
import { ReviewViewModel } from "./review";

export interface EateryViewModel {
    id: number;
    name: string;
    type: string;
    address: string;
    email?: string;
    phoneNumber?: string;
    businessDayTimes?: BusinessDayTimeViewModel[];
    guestCapacity: number;
    rating: number;
    reviews?: ReviewViewModel[];
  }