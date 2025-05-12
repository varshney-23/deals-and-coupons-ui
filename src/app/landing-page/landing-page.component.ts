import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogeComponent } from '../auth-dialoge/auth-dialoge.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {

  constructor(private dialog: MatDialog) {}

  openAuthDialog(): void {
    this.dialog.open(AuthDialogeComponent, {
      width: '50vh',
      disableClose: false
    });
  }
}
