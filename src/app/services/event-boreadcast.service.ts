import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventBroadcastService {
  private triggerFunctionSubject = new Subject<void>();

  triggerFunction$ = this.triggerFunctionSubject.asObservable();

  triggerFunction() {
    console.log('inside trigger')
    this.triggerFunctionSubject.next();
  }
}

