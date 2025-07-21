import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../../models/brand.model';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-branddialog',
  imports: [CommonModule],
  templateUrl: './branddialog.component.html',
  styleUrls: ['./branddialog.component.css']
})
export class BrandDialogComponent {

  brands: Brand[] = [];

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private dialogRef: MatDialogRef<BrandDialogComponent>) {}


  ngOnInit() {
    this.http.get<Brand[]>('http://localhost:8765/inventory/brands').subscribe(data => {
      this.brands = data;
    });
  }

  selectBrand(brand: Brand) {
    this.router.navigate(['/coupons-by-brands-admin', brand.brandName]);
    this.dialogRef.close();
  }
}
