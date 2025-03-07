import { BusinessDayTimeViewModel } from "./business-day-time";

export interface EateryManagerViewModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    eateryId: number;
    jobTitle: string;
    workSchedules?: BusinessDayTimeViewModel[];
  }
  