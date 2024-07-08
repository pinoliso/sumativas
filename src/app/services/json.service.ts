import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer b73e6620-4951-45e2-8d9f-ce6c9022bf4b'
    })
  }

  public jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/sumativas2.appspot.com/o/usuarios.json?alt=media&token=b73e6620-4951-45e2-8d9f-ce6c9022bf4b';

  private lista:any;
  users: any;

  constructor(private http: HttpClient) {}

  getJsonData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl) 
  }

  async saveJsonData(json:any) {
    console.log(json);
    return await lastValueFrom(this.http.post(this.jsonUrl,json,this.httpOptions))
  }

  async getUsers() {
    try {
      return await lastValueFrom(this.getJsonData());
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }

  // ngOnInit(): void {
  //   this.getJsonData().subscribe(data => {
  //     this.users = data;
  //   });
  // }

  // saveJsonData(json: any): boolean {
  //   this.http.post(this.jsonUrl,json,this.httpOptions).subscribe(
  //     response => {
  //       console.log('Archivo JSON sobrescrito con exito', response);
  //       return true
  //     },
  //     error => {
  //       console.error('Error al sobrescribir el archivo JSON', error);
  //       return false
  //     })
  //   return true
  // }

  // async login(email: string, password: string): boolean{
  //   console.log('in login', this.users)
  //   const source$ = this.http.get(this.jsonUrl)
  //   this.users = await firstValueFrom(source$) 
  //   console.log('in login2', this.users)
  //   const user = this.users.find(u => u.email === email && u.password === password);
  //   if (user) 
  //     return true
  //   return false
  // }

  // getUserByEmail(email: string): any{
  //   console.log(this.users)
  //   console.log(this.users)
  //   return this.users.find(u => u.email === email);
  // }

  // registerUser(newUser: any): boolean{
  //   this.users.push(newUser)
  //   return this.saveJsonData(this.users)
  // }

  MetodoPersona(listaPersonas:any) {
    console.log(listaPersonas);
    this.http.post(this.jsonUrl,listaPersonas,this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      })
  }
}  
