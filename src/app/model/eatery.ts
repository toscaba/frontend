export interface Eatery {
    id: number;
    name: string;
    type: string;
    address: string;
    email?: string;
    phoneNumber?: string;
    businessDayTimes?: BusinessDayTime[];
    guestCapacity: number;
  }

  export interface BusinessDayTime {
    openDay: string;
    openTime: string;
    closeTime: string;
  }