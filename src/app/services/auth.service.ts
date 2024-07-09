import { Injectable } from '@angular/core';
import { JsonService } from './json.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor(private jsonService: JsonService, private http: HttpClient) {
    this.loadUser();
  }

  async login(email: string, password: string): Promise<boolean> {
    const users = await this.jsonService.getUsers()
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (user) {
      this.currentUser = { user };
      this.saveUser();
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  getUser(): any {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  private saveUser(): void {
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  private loadUser(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }
}
