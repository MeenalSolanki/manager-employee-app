import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//base url for authentication entrypoint
const AUTH_API = 'http://localhost:8080/mindbowser/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //login service
  constructor(private http:HttpClient) { }
  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }


  //register service
  register(manager): Observable<any> {

    console.log("email: "+manager.email);
    return this.http.post(AUTH_API + 'signup', manager, httpOptions);
    
  }
}
