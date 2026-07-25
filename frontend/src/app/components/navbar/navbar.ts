import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent implements OnInit {
  userName = 'User';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user_name') || 'User';
  }

  logout() {
    this.authService.logout();
  }
}
