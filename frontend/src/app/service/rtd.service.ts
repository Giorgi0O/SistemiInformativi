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

  private apiBaseUrl = environment.apiBaseUrl;
  private httpOption = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) {}

  public createRTD( id_D:number, id_t:number, dto:DtoRTD ):Observable<void>{
    const url = this.apiBaseUrl+'/postRTD/'+id_D.toString()+'/'+id_t.toString();
    return this.http.post<void>( url, dto, this.httpOption );
  }

  public deleteRTD( id:number ):Observable<R_TD>{
    const url = this.apiBaseUrl+'/deleteRTD/'+id.toString();
    return this.http.delete<R_TD>( url, this.httpOption );
  }

  public filtriRTD(data:String|null,idDipendente:number):Observable<R_TD[]>{
    const url = this.apiBaseUrl+'/filtriRTD/'+data+'/'+idDipendente.toString();
    return this.http.get<R_TD[]>(url);
  }

}
