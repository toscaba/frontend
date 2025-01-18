export interface Reservation {
    customerId: number;
    eateryId: number;
    eateryName?: string;
    guestNumber: number;
    reservationDateTime: string;
    status: string;
}