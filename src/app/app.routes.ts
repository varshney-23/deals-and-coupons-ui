import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DealsComponent } from './deals/deals.component';
import { AllusercouponsComponent } from './allusercoupons/allusercoupons.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'deals', component: DealsComponent },
  { path: 'allusercoupons/:brandName', component: AllusercouponsComponent }
];
