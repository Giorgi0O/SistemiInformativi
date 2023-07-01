import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiornataFeriale } from '../model/GiornateFerie';
import { environment } from 'src/environments/environment';
import {Dipendente} from "../model/Dipendente";
import {Data} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GiornataFerieService {

  private apiServerUrl = environment.apiBaseUrl;
  private backendUrl = 'http://localhost:8180';
  private httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})  }

  constructor( private http:HttpClient) { }

  public createGiornataFerie( giorntaFerie:GiornataFeriale ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/postFerie';
    return this.http.post<GiornataFeriale>( url, giorntaFerie, this.httpOption );
  }

  public updateGiornataFerie( old:number , nuovo:GiornataFeriale ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/modificaFerie/'+old.toString();
    return this.http.post<GiornataFeriale>( url, nuovo, this.httpOption );
  }

  public deleteGiornataFerie( id:number ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/deleteFerie/'+id.toString();
    return this.http.delete<GiornataFeriale>( url, this.httpOption );
  }

  public listaFerieRead():Observable<GiornataFeriale[]>{
    const url = this.apiServerUrl+'Ferie';
    return this.http.get<GiornataFeriale[]>(url);
  }

  public getGiornataFerie( id:number ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/Ferie/'+id.toString();
    return this.http.get<GiornataFeriale>(url);
  }

  public getDipendentiData(data:Date):Observable<Dipendente[]>{
    const url = this.apiServerUrl+'/Dipendenti/'+data.toString();
    return this.http.get<Dipendente[]>(url);
  }

  public getFerieDipendente(id:number):Observable<GiornataFeriale[]>{
    const url = this.apiServerUrl+'/FerieDipendente/'+id.toString();
    return this.http.get<GiornataFeriale[]>(url);
  }

  public getFerieFiltri(data:Date,ruolo:String):Observable<Dipendente[]>{
    const url = this.apiServerUrl+'/ferieFiltri/'+data.toString()+'/'+ruolo;
    return this.http.get<Dipendente[]>(url);
  }

}
