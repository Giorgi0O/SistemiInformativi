import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurnoLavorativo } from '../model/TurnoLavorativo';
import { environment } from 'src/environments/environment';
import { ContrattoLavorativo } from '../model/ContrattoLavorativo';
import {Dipendente} from "../model/Dipendente";

@Injectable({
  providedIn: 'root'
})
export class TurnoLavorativoService {

  private apiServerUrl = environment.apiBaseUrl;
  private backendUrl = 'http://localhost:8180';
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  public createTurno( turno:TurnoLavorativo ):Observable<TurnoLavorativo>{
    const url = this.backendUrl+'/postTurno';
    return this.http.post<TurnoLavorativo>( url, turno, this.httpOption );
  }

  public updateTurno( old:number , nuovo:TurnoLavorativo ):Observable<TurnoLavorativo>{
    const url = this.backendUrl+'/modificaTurno/'+old.toString();
    return this.http.post<TurnoLavorativo>( url, nuovo, this.httpOption );
  }

  public deleteTurno( id:number ):Observable<TurnoLavorativo>{
    const url = this.backendUrl+'/deleteTurno/'+id.toString();
    return this.http.delete<TurnoLavorativo>( url, this.httpOption );
  }

  public listaTurniRead():Observable<TurnoLavorativo[]>{
    const url = this.backendUrl+'/turni';
    return this.http.get<TurnoLavorativo[]>(url);
  }

  public getTurno(id:number):Observable<TurnoLavorativo>{
    const url = this.backendUrl+'/turno/'+id.toString();
    return this.http.get<TurnoLavorativo>(url);
  }

  public getOrariTurni():Observable<String[]>{
    const url = this.backendUrl+'/orariTurni';
    return this.http.get<String[]>(url);
  }


}
