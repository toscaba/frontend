export interface EateryViewModel {
    id: number;
    name: string;
    type: string;
    address: string;
    email?: string;
    phoneNumber?: string;
    businessDayTimes?: BusinessDayTime[];
    guestCapacity: number;
    rating: number;
    reviews: Review[];
  }

  export interface BusinessDayTime {
    day: string;
    startTime: string;
    endTime: string;
  }

  export interface Review {
    id: number;
    eateryId: number;
    customerId: number;
    message: string;
    rating: number;
  }