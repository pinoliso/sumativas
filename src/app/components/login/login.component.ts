import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { JsonService } from '../../services/json.service';
import { AuthService } from '../../services/auth.service';
import { interval, take, firstValueFrom, lastValueFrom } from 'rxjs';
import { EventBroadcastService } from '../../services/event-boreadcast.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JsonService, AuthService]
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  loginFailed: boolean = false;

  users: any[] = [];

  constructor(private authService: AuthService, private jsonService: JsonService, private router: Router, private eventBroadcastService: EventBroadcastService) {}
 
  async onSubmit() {
    // const ok: boolean = await this.authService.login(this.email, this.password)
    // const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      if (await this.authService.login(this.email, this.password)) {
        console.log('Login successful');
        this.eventBroadcastService.triggerFunction();
        this.loginFailed = false;
        this.router.navigate(['/index']);
      } else {
        console.log('Login failed');
        this.loginFailed = true;
      }

  }
}