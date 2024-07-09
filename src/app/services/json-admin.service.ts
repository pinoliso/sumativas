import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonAdminService {
  httpOptionsUsers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fd5f8802-8d7b-4382-9ac4-0db8ffebac0a'
    })
  }

  public jsonUrlUsers = 'https://firebasestorage.googleapis.com/v0/b/sumativas2.appspot.com/o/admins.json?alt=media&token=fd5f8802-8d7b-4382-9ac4-0db8ffebac0a';

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
