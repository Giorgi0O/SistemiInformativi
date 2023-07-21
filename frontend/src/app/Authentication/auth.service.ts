import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http:HttpClient ) { }


  login( username:String , password:String ):Observable<any>{
    const url = "http://localhost:8080/realms/BoomBurgher/protocol/openid-connect/token";
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    const requestBody = {
      client_id: 'BoomClient',
      client_secret: 'vh4nSlFGsfzxHFvvmCNzHM4U0qVGbVRD',
      username: username,
      password: password,
      grant_type: 'password'
    };
    const body =  this.toUrlEncodedString(requestBody);
    //const b = "client_id=BoomClient&client_secret=vh4nSlFGsfzxHFvvmCNzHM4U0qVGbVRD&username="+username+"&password="+password+"&grant_type=password";
    return this.http.post( url , body , httpOptions );
  }

  toUrlEncodedString(obj: any): string {
    const params = new URLSearchParams();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.set(key, obj[key]);
      }
    }
    return params.toString();
  }

}
