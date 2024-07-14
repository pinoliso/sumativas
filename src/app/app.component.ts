import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AdminAuthService } from './services/admin.auth.service';
import { CommonModule } from '@angular/common';

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

  // ngOnInit() {
  //   // this.eventSubscription = this.authService.triggerFunction$.subscribe((data: any) => {
  //   //   console.log('in suscribeeeee', data)
  //   //   this.isLoggedIn = true
  //   //   this.auth = data
  //   // });
  //   this.authService.user$.subscribe((data: any) => {
  //     console.log('in suscribeeeee', data)
  //     this.isLoggedIn = !!data
  //     this.user = data
  //   });
  // }

  // ngOnDestroy() {
  //   this.authService.user$.unsubscribe();
  // }

  logout() {
    this.authService.logout()
    this.adminAuthService.logout()
  }

}
