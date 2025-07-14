import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DealsComponent } from './deals/deals.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'deals', component: DealsComponent }
];
