import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-coupon-dialog',
  standalone: true,
  templateUrl: './coupon-dialog.component.html',
  styleUrls: ['./coupon-dialog.component.css'],
  imports: [CommonModule]
})
export class CouponDialogComponent {
  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: { couponCode: string },
  //   private clipboard: Clipboard
  // ) {}

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: { couponCode: string; error: string | null },
    private clipboard: Clipboard,
    private dialogRef: MatDialogRef<CouponDialogComponent>

) {}

  copyCode() {
    this.clipboard.copy(this.data.couponCode);
  }

  closeDialog() {
    this.dialogRef.close();
  } 

}
