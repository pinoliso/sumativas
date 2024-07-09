import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

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

  public jsonUrlUsers = 'https://firebasestorage.googleapis.com/v0/b/sumativas2.appspot.com/o/usuarios.json?alt=media&token=b73e6620-4951-45e2-8d9f-ce6c9022bf4b';

  private lista:any;
  users: any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.jsonUrlUsers) 
  }

  async saveJsonData(json:any) {
    console.log('registrando data usuarios', json);
    return await lastValueFrom(this.http.post(this.jsonUrlUsers,json,this.httpOptionsUsers))
  }

  async getUsers() {
    try {
      return await lastValueFrom(this.getJsonData());
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
}  
