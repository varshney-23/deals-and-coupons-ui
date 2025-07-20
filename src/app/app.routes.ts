import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DealsComponent } from './deals/deals.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PaymentComponent } from './payment/payment.component';

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
    loadComponent: () => import('./deals/deals.component').then(m => m.DealsComponent),
    canActivate: [AuthGuard]
  },

  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
    canActivate: [AuthGuard]
  },
  
  { 
    path: 'previous-purchases', 
    component: ReceiptComponent 
  },
  {
    path: 'previous-purchases',
    loadComponent: () => import('./receipt/receipt.component').then(m => m.ReceiptComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'user-portal/:brandName', 
    component: UserPortalComponent 
  },
  { 
    path: 'payment', 
    component: PaymentComponent 
  },
  { 
    path: 'payment', 
    loadComponent: () => import('./payment/payment.component').then(m => m.PaymentComponent),
    canActivate: [AuthGuard]
  },
  //any other path should redirect to deals if authenticated
  {
    path: '**',
    redirectTo: 'deals'
  },
];