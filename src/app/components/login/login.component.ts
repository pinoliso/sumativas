import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  users: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}
 
  async onSubmit() {
    this.authService.login("", "")
    this.router.navigate(['/index'])
    // const ok: boolean = await this.authService.login(this.email, this.password)
    // const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      // if (await this.authService.login(this.email, this.password)) {
      //   console.log('Login successful');
      //   this.loginFailed = false;
      //   this.router.navigate(['/index']);
      // } else {
      //   console.log('Login failed');
      //   this.loginFailed = true;
      // }

  }
}