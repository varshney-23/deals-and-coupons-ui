import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

    private baseUrl = 'http://localhost:8765/inventory/user/bookings'; // API Gateway endpoint

    constructor(private http: HttpClient) {}

    getPaidBookings(): Observable<any> {
        return this.http.get(`${this.baseUrl}/paid`);
    }

    getPromoBookings(): Observable<any> {
        return this.http.get(`${this.baseUrl}/promo`);
    }

    getAllBookings(): Observable<any[]> {
        return forkJoin([
            this.getPaidBookings(),
            this.getPromoBookings()
        ]);
    }
}
