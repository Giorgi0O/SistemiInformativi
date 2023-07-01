import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Ruolo} from "../model/Ruolo";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Dipendente} from "../model/Dipendente";

@Injectable({
  providedIn: 'root'
})
export class RuoloService {

  private apiServerUrl = environment.apiBaseUrl;
  private backendUrl = 'http://localhost:8180';
  private httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})  }

  constructor( private http:HttpClient ) { }

  public createRuolo( ruolo:Ruolo ):Observable<Ruolo>{
    const url = this.apiServerUrl+'/postRuolo';
    return this.http.post<Ruolo>( url, ruolo, this.httpOption );
  }

  public updateRuolo( old:number , nuovo:Ruolo ):Observable<Ruolo>{
    const url = this.apiServerUrl+'/modificaRuolo/'+old.toString();
    return this.http.post<Ruolo>( url, nuovo, this.httpOption );
  }

  public deleteRuolo( id:number ):Observable<Ruolo>{
    const url = this.apiServerUrl+'/deleteRuolo/'+id.toString();
    return  this.http.delete<Ruolo>( url, this.httpOption );
  }

  public listaRuoloRead():Observable<Ruolo[]>{
    const url = this.apiServerUrl+'/ruoli'
    return this.http.get<Ruolo[]>(url);
  }


}
