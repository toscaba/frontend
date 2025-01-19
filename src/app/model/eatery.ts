export interface Eatery {
    id: number;
    name: string;
    type: string;
    address: string;
    email: string;
    phoneNumber: string;
    businessDayTimes?: BusinessDayTime[];
  }

  export interface BusinessDayTime {
    openDay: string;
    openTime: string;
    closeTime: string;
  }