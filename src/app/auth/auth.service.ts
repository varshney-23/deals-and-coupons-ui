import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8092';

  constructor(private http: HttpClient) {}

  // Auth APIs
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  signup(signupPayload: { username: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, signupPayload);
  }

//   getProfile(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/auth/profile`);
//   }

//   // Coupon APIs
//   getAllCoupons(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/inventory/coupon/all`);
//   }

//   getCouponsByBrand(brand: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/inventory/coupon/get/brand?name=${brand}`);
//   }

//   getCouponsByCategory(category: string): Observable<any> {
//     return this.http.get(`${this.baseUrl}/inventory/coupon/get/category?type=${category}`);
//   }

//   addCoupon(couponData: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/inventory/coupon/add`, couponData);
//   }

//   updateCoupon(couponId: string, updatedData: any): Observable<any> {
//     return this.http.put(`${this.baseUrl}/inventory/coupon/update/${couponId}`, updatedData);
//   }

//   deleteCoupon(couponId: string): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/inventory/coupon/delete/${couponId}`);
//   }

//   deleteExpiredCoupons(): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/inventory/coupon/delete-expired`);
//   }

//   // Booking APIs
//   getUserBookings(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/inventory/booking/user/`);
//   }

//   getAllBookings(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/inventory/booking/all`);
//   }

//   bookPromotional(couponId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/inventory/booking/promotional`, { couponId });
//   }

//   bookPaid(couponId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/inventory/booking/paid`, { couponId });
//   }

//   payNow(bookingId: string): Observable<any> {
//     return this.http.post(`${this.baseUrl}/inventory/booking/payment`, { bookingId });
//   }
}