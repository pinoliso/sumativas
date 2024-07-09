import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { EventBroadcastService } from './services/event-boreadcast.service'
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AuthService, EventBroadcastService]
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

}
