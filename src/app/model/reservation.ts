export interface ReservationViewModel {
    id: number;
    customerId: number;
    customerName?: string;
    eateryId: number;
    eateryName?: string;
    guestNumber: number;
    reservationDateTime: string;
    status: string;
}