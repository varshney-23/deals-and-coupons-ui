// coupon.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CouponResponseDTO } from '../models/couponresponsedto.model'; // Assuming you have a DTO for coupon response

@Injectable({
  providedIn: 'root'
})
export class CouponService {

    constructor(private http: HttpClient) {}


    getAllCoupons(): Observable<CouponResponseDTO[]> {
    return this.http.get<CouponResponseDTO[]>('http://localhost:8765/inventory/coupon/all');
    }
}
