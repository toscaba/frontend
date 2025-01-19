export interface ReservationViewModel {
    id: number;
    customerId: number;
    eateryId: number;
    eateryName?: string;
    guestNumber: number;
    reservationDateTime: string;
    status: string;
}