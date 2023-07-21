import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { R_TD } from '../model/R_TD';
import { environment } from 'src/environments/environment';
import {GiornataFeriale} from "../model/GiornateFerie";
import {Ruolo} from "../model/Ruolo";
import { DtoRTD } from '../model/DtoRTd';

@Injectable({
  providedIn: 'root'
})
export class RtdService {

  private apiServerUrl = environment.apiBaseUrl;
  private backendUrl = 'http://localhost:8180';
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) {}

  public createRTD( id_D:number, id_t:number, dto:DtoRTD ):Observable<void>{
    const url = this.apiServerUrl+'/postRTD/'+id_D.toString()+'/'+id_t.toString();
    return this.http.post<void>( url, dto, this.httpOption );
  }

  public updateRTD( old:number , nuovo:R_TD ):Observable<R_TD>{
    const url = this.apiServerUrl+'/modificaRTD/'+old.toString();
    return this.http.post<R_TD>( url, nuovo, this.httpOption );
  }

  public deleteRTD( id:number ):Observable<R_TD>{
    const url = this.apiServerUrl+'/deleteRTD/'+id.toString();
    return this.http.delete<R_TD>( url, this.httpOption );
  }

  public listaRTDRead():Observable<R_TD[]>{
    const url = this.apiServerUrl+'/RTD'
    return this.http.get<R_TD[]>(url, { withCredentials: true } );
  }

  public filtriRTD(data:String|null,idDipendente:number):Observable<R_TD[]>{
    const url = this.apiServerUrl+'/filtriRTD/'+data+'/'+idDipendente.toString();
    return this.http.get<R_TD[]>(url);
  }

}
