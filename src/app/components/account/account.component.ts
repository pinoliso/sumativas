import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JsonService } from '../../services/json.service';
import { AuthService } from '../../services/auth.service';
import { interval, take, firstValueFrom, lastValueFrom } from 'rxjs';
import { EventBroadcastService } from '../../services/event-boreadcast.service'
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  providers: [JsonService, AuthService]
})
export class AccountComponent {


  card: string = '';
  amount: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private jsonService: JsonService, private router: Router, private eventBroadcastService: EventBroadcastService) {}

  async onSubmit() {
    // const ok: boolean = await this.authService.login(this.email, this.password)
    // const user = users.find((u: any) => u.email === this.email && u.password === this.password);
      await this.authService.addBalance(parseInt(this.amount))
      this.eventBroadcastService.triggerFunction(this.authService.getUser());

  }
}
