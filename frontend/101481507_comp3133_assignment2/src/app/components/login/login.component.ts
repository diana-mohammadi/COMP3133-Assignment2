import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        const token = res?.data?.login?.token;
        if (token) {
          this.auth.saveToken(token);
          this.router.navigate(['/employees']);
        } else {
          this.errorMessage = 'Login failed.';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
}