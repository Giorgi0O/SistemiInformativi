import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dipendente } from '../model/Dipendente';
import { environment } from 'src/environments/environment';
import { ContrattoLavorativo } from '../model/ContrattoLavorativo';

@Injectable({
  providedIn: 'root'
})
export class DipendentiService {

  private apiBaseUrl = environment.apiBaseUrl;
  private httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})  }

  constructor( private http:HttpClient ) { }

  public getDipendenti():Observable<Dipendente[]>{
    return this.http.get<Dipendente[]>( this.apiBaseUrl+'/dipendenti' );
  }//all dipedenti

  public getDipendentiSede( sede:String ):Observable<Dipendente[]>{
    return this.http.get<Dipendente[]>( this.apiBaseUrl+'/dipendenti/'+sede );
  }//sede

  public createDipendente( dipendente:Dipendente ):Observable<Dipendente>{
    const url = this.apiBaseUrl+'/postDipendente';
    return this.http.post<Dipendente>( url, dipendente, this.httpOption );
  }//create dipendente

  public updateDipendente( old:number , nuovo:Dipendente ):Observable<Dipendente>{
    const url = this.apiBaseUrl+'/modificaDipendente/'+old.toString();
    return this.http.put<Dipendente>( url, nuovo, this.httpOption );
  }//post dipendente

  public deleteDipendente( id:number ):Observable<Dipendente>{
    const url = this.apiBaseUrl+'/deleteDipendente/'+id.toString();
    return this.http.delete<Dipendente>( url, this.httpOption );
  }//delete dipendente

  public getDipendente( id:number ):Observable<Dipendente>{
    const url = this.apiBaseUrl+'/dipendente/'+id.toString();
    return this.http.get<Dipendente>( url )
  }//dipendente by id

  public getDipendentiFiltri( nomeRuolo:String , tipContratto :String ): Observable<Dipendente[]> {
    const url = this.apiBaseUrl+'/dipendentiFiltri/'+nomeRuolo+'/'+tipContratto ;
    return this.http.get<Dipendente[]>( url );
  }//filtri

  public getDipendentiNome( nome:String ): Observable<Dipendente[]> {
    const url = this.apiBaseUrl+'/dipendentiNome/'+nome ;
    return this.http.get<Dipendente[]>( url );
  }//Get dipendenti by nome

  //CONTRATTO
  public getAllContratti(): Observable<ContrattoLavorativo[]> {
    const url = this.apiBaseUrl+'/contratti' ;
    return this.http.get<ContrattoLavorativo[]>( url );
  }//Get all contratto

  public getContrattoId( id:number ): Observable<ContrattoLavorativo> {
    const url = this.apiBaseUrl+'/contratto/'+id.toString ;
    return this.http.get<ContrattoLavorativo>( url );
  }//Get contratto id

  public getContrattoDipendente( id:number ): Observable<ContrattoLavorativo> {
    const url = this.apiBaseUrl+'/contrattoDipendente/'+id.toString ;
    return this.http.get<ContrattoLavorativo>( url );
  }//Get contratto dipendente

  public disponibilita( email: String ):Observable<number>{
    const url=this.apiBaseUrl+'/disponibilita/'+email;
    return this.http.get<number>(url);
  }

  public getDipendenteEmail(email:String):Observable<Dipendente>{
    const url=this.apiBaseUrl+'/dipendenteEmail/'+email;
    return this.http.get<Dipendente>(url);
  }


}
