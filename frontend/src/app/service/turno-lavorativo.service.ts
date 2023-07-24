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

  private apiBaseUrl = environment.apiBaseUrl;
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }

  public listaTurniRead():Observable<TurnoLavorativo[]>{
    const url = this.apiBaseUrl+'/turni';
    return this.http.get<TurnoLavorativo[]>(url);
  }

}
