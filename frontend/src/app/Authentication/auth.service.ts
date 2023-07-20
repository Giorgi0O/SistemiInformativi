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
    const b = "client_id=BoomClient&client_secret=vh4nSlFGsfzxHFvvmCNzHM4U0qVGbVRD&username="+username+"&password="+password+"&grant_type=password";
    return this.http.post( url , b, httpOptions );
  }

}
