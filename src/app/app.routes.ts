import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DealsComponent } from './deals/deals.component';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent 
  },
  { 
    path: 'deals', 
    component: DealsComponent 
  },
  {
    path: 'cart',
    component: CartComponent
  },
  { 
    path: 'user-portal/:brandName', 
    component: UserPortalComponent 
  },
  {
    path: 'deals',
    loadComponent: () => import('./deals/deals.component').then(m => m.DealsComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: '**',
    redirectTo: 'deals'
  }
];