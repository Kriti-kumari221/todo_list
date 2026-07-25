import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.errorMessage = '';
    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Registration failed';
      }
    });
  }
}