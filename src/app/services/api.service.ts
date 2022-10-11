import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/login',
      {
        username,
        password
        //si las variables de la funcion se llaman igual al key, puedes poner solo los variables
      }
    )
  }

  searchPokemon(name: string): Observable<any> {
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/mirror/pokemon',
      {
        "endpoint": "pokemon/" + name
      })
  }

  getSession(option: string) : string{
    let session = JSON.parse(localStorage.getItem('session')!)
    if (option === 'user') {
      return session.username
    }
    return session.token
  }

  check(): Observable<any>{
    return this.http.get('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/check',{
      headers: {
        Authorization: "Bearer "+ this.getSession('token')
      }
    })
  }

  refreshToken(): Observable<any>{
    return this.http.post('http://ec2-18-116-97-69.us-east-2.compute.amazonaws.com:4001/api/refresh',{
      user: this.getSession('user')
    })
  }

}
