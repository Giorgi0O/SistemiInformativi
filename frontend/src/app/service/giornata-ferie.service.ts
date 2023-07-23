import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiornataFeriale } from '../model/GiornateFerie';
import { environment } from 'src/environments/environment';
import {Dipendente} from "../model/Dipendente";
import {Data} from "@angular/router";
import { rfd } from '../model/rfd';

@Injectable({
  providedIn: 'root'
})
export class GiornataFerieService {

  private apiServerUrl = environment.apiBaseUrl;
  private httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})  }

  constructor( private http:HttpClient) { }

  public createGiornataFerie( id:number ,giorntaFerie:GiornataFeriale ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/aggiungiNuovaFerie/'+id.toString();
    return this.http.post<GiornataFeriale>( url, giorntaFerie, this.httpOption );
  }

  public updateGiornataFerie( old:number , nuovo:GiornataFeriale ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/modificaFerie/'+old.toString();
    return this.http.post<GiornataFeriale>( url, nuovo, this.httpOption );
  }

  public deleteGiornataFerie( id:number ):Observable<void>{
    const url = this.apiServerUrl+'/deleteFerie/'+id.toString();
    return this.http.delete<void>( url );
  }//delete

  public listaFerieRead():Observable<GiornataFeriale[]>{
    const url = this.apiServerUrl+'/Ferie';
    return this.http.get<GiornataFeriale[]>(url);
  }//all ferie

  public listaRfd():Observable<rfd[]>{
    const url = this.apiServerUrl+'/rfd';
    return this.http.get<rfd[]>(url);
  }//all ferie

  public getGiornataFerie( id:number ):Observable<GiornataFeriale>{
    const url = this.apiServerUrl+'/Ferie/'+id.toString();
    return this.http.get<GiornataFeriale>(url);
  }//find by id

  public getDipendentiData(id:number):Observable<Dipendente[]>{
    const url = this.apiServerUrl+'/Dipendenti/'+id.toString();
    return this.http.get<Dipendente[]>(url);
  }// dipendenti in ferie per quella data

  public getFerieDipendente(id:number):Observable<rfd[]>{
    const url = this.apiServerUrl+'/FerieDipendente/'+id.toString();
    return this.http.get<rfd[]>(url);
  }

  public getFerieFiltri(data:String,ruolo:String):Observable<Dipendente[]>{
    const url = this.apiServerUrl+'/ferieFiltri/'+data+'/'+ruolo;
    return this.http.get<Dipendente[]>(url);
  }

  public richiediFerie(data:String,dipendente:Dipendente):Observable<void>{
    const url = this.apiServerUrl+'/richiediFerie/'+data;
    return this.http.post<void>(url,dipendente,this.httpOption);
  }

  public disponibilitaData(data:String):Observable<boolean>{
    const url = this.apiServerUrl+'/disponibilitaData/'+data;
    return this.http.get<boolean>(url);
  }

}
