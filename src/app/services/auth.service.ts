import { Injectable, signal } from '@angular/core'
import { User } from '../models/user'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = signal<User | undefined | null>(undefined)

  constructor(private router: Router) {
    this.loadUser()
  }

  login(email: string, password: string): any {
    this.setUser({email:"pinoliso@gmail.com", name:"Enrique Pino", birthdate: new Date("1980-01-01"), balance: 1100.0, password: "12341234", transactions: [], payments: []})
  }

  isLoggedIn(): boolean {
    return this.user$() !== null && this.user$() !== undefined
  }

  logout(): void {
    localStorage.removeItem('user')
    this.user$.set(null)
    this.router.navigate(['/'])
  }
  
  private loadUser(): void {
    const userJson = localStorage.getItem('user')
    if (userJson) {
      this.user$.set(JSON.parse(userJson))
    }
  }

  getUser(): any {
    return this.user$()
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
    this.user$.set(user)
  }

  private saveUser(): void {
    
  }

  // private currentUser: any = null;

  // constructor(private jsonService: JsonService) {
  //   this.loadUser();
  // }

  // async login(email: string, password: string): Promise<any> {
  //   const users = await this.jsonService.getUsers()
  //   const user = users.find((u: any) => u.email === email && u.password === password)
  //   if (user) {
  //     this.currentUser = user;
  //     this.saveUser();
  //     return user;
  //   }
  //   return null;
  // }

  // logout(): void {
  //   this.currentUser = null;
  //   localStorage.removeItem('user');
  // }

  // getUser(): any {
  //   return this.currentUser;
  // }

  // async addBalance(balance: number) {
  //   this.currentUser.balance += balance
  //   this.saveUser()
  //   const users = await this.jsonService.getUsers()
  //   console.log(users,'users')
  //   users.forEach((user: any, index: number) => {
  //     if(user.email == this.currentUser.email) {
  //       users[index].balance = this.currentUser.balance
  //       this.jsonService.saveJsonData(users)
  //     }
  //   })
  // }

  // isLoggedIn(): boolean {
  //   return !!this.getUser();
  // }

  // private saveUser(): void {
  //   localStorage.setItem('user', JSON.stringify(this.currentUser));
  // }

  // private loadUser(): void {
  //   const userJson = localStorage.getItem('user');
  //   if (userJson) {
  //     this.currentUser = JSON.parse(userJson);
  //   }
  // }
}
