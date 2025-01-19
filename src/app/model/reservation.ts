export interface Reservation {
    id: number;
    customerId: number;
    eateryId: number;
    eateryName: string;
    guestNumber: number;
    reservationDateTime: string;
    status: string;
}