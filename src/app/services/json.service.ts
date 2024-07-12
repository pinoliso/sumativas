import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, lastValueFrom } from 'rxjs'
import { User } from '../models/user'
import { Admin } from '../models/admin'

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptionsUsers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer b73e6620-4951-45e2-8d9f-ce6c9022bf4b'
    })
  }

  public jsonUrlUsers = 'https://firebasestorage.googleapis.com/v0/b/sumativas2.appspot.com/o/usuarios.json?alt=media&token=b73e6620-4951-45e2-8d9f-ce6c9022bf4b'
  public jsonUrlAdmins = 'https://firebasestorage.googleapis.com/v0/b/sumativas2.appspot.com/o/admins.json?alt=media&token=fd5f8802-8d7b-4382-9ac4-0db8ffebac0a'

  constructor(private http: HttpClient) {}

  getJsonData(url: string): Observable<any> {
    return this.http.get<any>(url) 
  }

  saveJsonData(json:any, url:string) {
    console.log('registrando data', json)
    return this.http.post(this.jsonUrlUsers,json,this.httpOptionsUsers)
  }

  async getUsers(): Promise<any> {
    try {
      return await lastValueFrom(this.getJsonData(this.jsonUrlUsers))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  async setUsers(users: User[]) {
    try {
      await lastValueFrom(this.saveJsonData(users, this.jsonUrlUsers))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  async getAdmins(): Promise<any> {
    try {
      return await lastValueFrom(this.getJsonData(this.jsonUrlAdmins))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  async setAdmins(admins: Admin[]) {
    try {
      await lastValueFrom(this.saveJsonData(admins, this.jsonUrlAdmins))
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }
}  
