import { Injectable } from '@angular/core';
import { JsonService } from './json.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  constructor(private jsonService: JsonService) {
    this.loadUser();
  }

  async login(email: string, password: string): Promise<boolean> {
    const users = await this.jsonService.getUsers()
    const user = users.find((u: any) => u.email === email && u.password === password)
    if (user) {
      this.currentUser = user;
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

  async addBalance(balance: number) {
    this.currentUser.balance += balance
    this.saveUser()
    const users = await this.jsonService.getUsers()
    console.log(users,'users')
    users.forEach((user: any, index: number) => {
      if(user.email == this.currentUser.email) {
        users[index].balance = this.currentUser.balance
        this.jsonService.saveJsonData(users)
      }
    })
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
