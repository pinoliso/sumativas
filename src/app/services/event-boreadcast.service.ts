import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventBroadcastService {
  eventEmitter = new EventEmitter<any>();

  // Método para emitir eventos
  broadcastEvent(data: any) {
    this.eventEmitter.emit(data);
  }
}

