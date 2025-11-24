import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthCustomService } from '../auth-custom.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login.component',
  imports: [MatSnackBarModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private authService = inject(AuthCustomService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  constructor(

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const values = this.loginForm.value;
    console.log('submit with ');
    console.table(values);
    this.authService.login(this.email, this.password).
      subscribe({
        next: response => {
          console.log('user is logged in'),
            this.router.navigateByUrl('/');
        },
        error: (err: Error) => {
          this.openErrorSnackBar('Incorrect email or password')
          console.log(err.message);
        }

      });

  }

  get email() {
    return this.loginForm.get('email')?.value;
  }
  get password() {
    return this.loginForm.get('password')?.value;
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000, // Set the duration for how long the snackbar should be visible (in milliseconds)
      panelClass: ['error-snackbar'], // You can define custom styles for the snackbar
    });
  }


}

