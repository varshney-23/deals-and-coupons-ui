import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DealsComponent } from './user/deals/deals.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './user/cart/cart.component';
import { ReceiptComponent } from './user/receipt/receipt.component';
import { PaymentComponent } from './user/payment/payment.component';
import { AdminPortalComponent } from './admin/admin-portal/admin-portal.component';
import { AllCouponsComponent } from './admin/all-coupons/all-coupons.component';
import { CouponsByBrandsComponent as AdminCouponsByBrandsComponent } from './admin/coupons-by-brands/coupons-by-brands.component';
import { CouponsByBrandsComponent as UserCouponsByBrandsComponent } from './user/coupons-by-brands/coupons-by-brands.component';
import { create } from 'domain';
import { CreateCouponComponent } from './admin/create-coupon/create-coupon.component';

export const routes: Routes = [

  //landing page => 
  { 
    path: '', 
    component: LandingPageComponent 
  },

  { 
    path: 'deals', 
    component: DealsComponent 
  },
  {
    path: 'deals',
    loadComponent: () => import('./user/deals/deals.component').then(m => m.DealsComponent),
    canActivate: [AuthGuard]
  },

  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'cart',
    loadComponent: () => import('./user/cart/cart.component').then(m => m.CartComponent),
    canActivate: [AuthGuard]
  },
  
  { 
    path: 'previous-purchases', 
    component: ReceiptComponent 
  },
  {
    path: 'previous-purchases',
    loadComponent: () => import('./user/receipt/receipt.component').then(m => m.ReceiptComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'coupons-by-brands/:brandName', 
    component: UserCouponsByBrandsComponent
  },
  { 
    path: 'coupons-by-brands/:brandName', 
    loadComponent: () => import('./user/coupons-by-brands/coupons-by-brands.component').then(m => m.CouponsByBrandsComponent),
    canActivate: [AuthGuard]
  },

  { 
    path: 'coupons-by-brands-admin/:brandName', 
    component: AdminCouponsByBrandsComponent
  },
  { 
    path: 'coupons-by-brands-admin/:brandName', 
    loadComponent: () => import('./admin/coupons-by-brands/coupons-by-brands.component').then(m => m.CouponsByBrandsComponent),
    canActivate: [AuthGuard]
  },

  { 
    path: 'admin/create-coupon', 
    component: CreateCouponComponent
  },
  { 
    path: 'admin/create-coupon', 
    loadComponent: () => import('./admin/create-coupon/create-coupon.component').then(m => m.CreateCouponComponent),
    canActivate: [AuthGuard]
  },

  { 
    path: 'payment', 
    component: PaymentComponent 
  },
  { 
    path: 'payment', 
    loadComponent: () => import('./user/payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [AuthGuard]
  },

  { 
    path: 'admin-portal', 
    component: AdminPortalComponent 
  },

  { 
    path: 'admin-portal', 
    loadComponent: () => import('./admin/admin-portal/admin-portal.component').then(m => m.AdminPortalComponent),
    canActivate: [AuthGuard]
  },

  { 
    path: 'coupons/all', 
    component: AllCouponsComponent 
  },
  { 
    path: 'coupons/all', 
    loadComponent: () => import('./admin/all-coupons/all-coupons.component').then(m => m.AllCouponsComponent),
    canActivate: [AuthGuard]
  },

  //any other path should redirect to deals if authenticated
  {
    path: '**',
    redirectTo: 'deals'
  },
];