import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { JsonService } from '../../services/json.service';
import { interval, take, firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JsonService]
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  users: any[] = [];

  constructor(private jsonService: JsonService, private router: Router) {}
 
  async onSubmit() {
    const users = await this.jsonService.getUsers()
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      if (user) {
        console.log('Login successful');
        this.loginFailed = false;
        this.router.navigate(['/index']);
      } else {
        console.log('Login failed');
        this.loginFailed = true;
      }

  }
}