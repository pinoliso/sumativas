import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AdminAuthService } from './services/admin.auth.service';
import { CommonModule } from '@angular/common';

/**
 * @description
 * 
 * Componente inicial que contiene el menú de navegación
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {

  constructor(public authService: AuthService, public adminAuthService: AdminAuthService) {}

  title: string = 'Rucasino'

  logout() {
    this.authService.logout()
    this.adminAuthService.logout()
  }

}
