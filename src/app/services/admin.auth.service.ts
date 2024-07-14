import { Injectable, signal } from '@angular/core'
import { Admin } from '../models/admin'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  admin$ = signal<Admin | undefined | null>(undefined)

  constructor(private router: Router) {
    this.loadAdmin()
  }

  login(email: string, password: string, admins: Admin[]): boolean {
    const adminFind = admins.find((u: any) => u.email === email && u.password === password)
    console.log('adminfind', adminFind)
    if(adminFind) {
      this.setAdmin(adminFind)
      //this.setAdmin({email:"pinoliso@gmail.com", name:"Enrique Pino", birthdate: new Date("1980-01-01"), balance: 1100.0, password: "12341234", transactions: [], payments: []})
      return true
    }
    return false
    // this.setAdmin({email:"pinoliso@gmail.com", name:"Enrique Pino", birthdate: new Date("1980-01-01"), balance: 1100.0, password: "12341234", transactions: [], payments: []})
  }

  isLoggedIn(): boolean {
    return this.admin$() !== null && this.admin$() !== undefined
  }

  logout(): void {
    localStorage.removeItem('admin')
    this.admin$.set(null)
    this.router.navigate(['/'])
  }
  
  private loadAdmin(): void {
    const adminJson = localStorage.getItem('admin')
    if (adminJson) {
      this.admin$.set(JSON.parse(adminJson))
    }
  }

  getAdmin(): any {
    return this.admin$()
  }

  setAdmin(admin: Admin): void {
    localStorage.setItem('admin', JSON.stringify(admin))
    this.admin$.set(admin)
    console.log('set admin', admin)
  }

  private saveAdmin(): void {
    
  }

}
