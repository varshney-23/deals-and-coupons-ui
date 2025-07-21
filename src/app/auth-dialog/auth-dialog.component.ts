import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-dialog',
  standalone: true,
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class AuthDialogComponent {
  selectedTab = 0;
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMsg = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  showAlert(message: string) {
    alert(message);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (token) => {
          localStorage.setItem('authToken', token); // ensure it's set

          const role = this.authService.getUserRole();
          console.log(role);

          this.dialogRef.close();
          if (role === 'ROLE_ADMIN') {
            this.router.navigate(['/admin-portal']);
          } else {
            this.router.navigate(['/deals']);
          }
        },
        error: () => {
          this.errorMsg = 'Invalid credentials';
          this.loading = false;
        }
      });
    }
  }


  onSignup() {
  if (this.signupForm.valid && this.signupForm.value.password === this.signupForm.value.confirmPassword) {
    this.loading = true;

    const { name, email, password } = this.signupForm.value;

    const signupPayload = {
      username: name,    
      email: email,
      password: password
    };

    this.authService.signup(signupPayload).subscribe({
      next: () => {
        // After successful signup, automatically login
        this.authService.login({ email, password }).subscribe({
          next: () => {
            this.dialogRef.close();
            this.router.navigate(['/deals']);
          },
          error: () => {
            this.errorMsg = 'Login failed after signup';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.errorMsg = 'Signup failed';
        this.loading = false;
      }
    });

  } else {
    this.errorMsg = 'Passwords do not match';
  }
}
}