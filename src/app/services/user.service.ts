import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user$ = new BehaviorSubject<any>(null)

  constructor() {}

  // set(user: any) {
  //   this.user$.next(user)
  // }
}
