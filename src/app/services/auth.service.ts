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

  login(email: string, password: string, users: User[]): boolean {
    const userFind = users.find((u: any) => u.email === email && u.password === password)
    console.log('userfind', userFind)
    if(userFind) {
      this.setUser(userFind)
      //this.setUser({email:"pinoliso@gmail.com", name:"Enrique Pino", birthdate: new Date("1980-01-01"), balance: 1100.0, password: "12341234", transactions: [], payments: []})
      return true
    }
    return false
    // this.setUser({email:"pinoliso@gmail.com", name:"Enrique Pino", birthdate: new Date("1980-01-01"), balance: 1100.0, password: "12341234", transactions: [], payments: []})
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
    console.log('set user', user)
  }

  private saveUser(): void {
    
  }

}
