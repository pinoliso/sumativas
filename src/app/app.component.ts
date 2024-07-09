import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { EventBroadcastService } from './services/event-boreadcast.service'
import { JsonService } from './services/json.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [JsonService]
})
export class AppComponent implements OnInit, OnDestroy {

  eventData: any;
  private eventSubscription: Subscription | null = null;

  constructor(private eventBroadcastService: EventBroadcastService) {}

  title: string = 'sumativas';
  isLoggedIn: boolean = false

  ngOnInit() {
    this.eventSubscription = this.eventBroadcastService.triggerFunction$.subscribe(() => {
      console.log('in suscribeeeee')
      this.isLoggedIn = true
    });
  }

  ngOnDestroy() {
      this.eventSubscription?.unsubscribe();
  }

  logout() {
    // this.authService.logout()

  }

}
