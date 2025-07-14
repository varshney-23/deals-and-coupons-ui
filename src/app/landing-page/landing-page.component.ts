import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [AuthDialogComponent]
})
export class LandingPageComponent {
  constructor(private dialog: MatDialog) {}

  openAuthDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      width: '50vh',
      disableClose: false
    });
  }
}
