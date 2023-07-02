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
  private backendUrl = 'http://localhost:8180';
  private httpOption = { headers: new HttpHeaders({'Content-Type': 'application/json'})  }

  constructor( private http:HttpClient ) { }

  public getDipendenti():Observable<Dipendente[]>{
    return this.http.get<Dipendente[]>( this.backendUrl+'/dipendenti' );
  }//all dipedenti

  public getDipendentiSede( sede:String ):Observable<Dipendente[]>{
    return this.http.get<Dipendente[]>( this.backendUrl+'/dipendenti/'+sede );
  }//sede

  public createDipendente( dipendente:Dipendente ):Observable<Dipendente>{
    const url = this.backendUrl+'/postDipendente';
    return this.http.post<Dipendente>( url, dipendente, this.httpOption );
  }//create dipendente

  public updateDipendente( old:number , nuovo:Dipendente ):Observable<Dipendente>{
    const url = this.backendUrl+'/modificaDipendente/'+old.toString();
    return this.http.put<Dipendente>( url, nuovo, this.httpOption );
  }//post dipendente

  public deleteDipendente( id:number ):Observable<Dipendente>{
    const url = this.backendUrl+'/deleteDipendente/'+id.toString();
    return this.http.delete<Dipendente>( url, this.httpOption );
  }//delete dipendente

  public getDipendente( id:number ):Observable<Dipendente>{
    const url = this.backendUrl+'/dipendente/'+id.toString();
    return this.http.get<Dipendente>( url )
  }//dipendente by id

  public getDipendentiFiltri( nomeRuolo:String , tipContratto :String ): Observable<Dipendente[]> {
    const url = this.backendUrl+'/dipendentiFiltri/'+nomeRuolo+'/'+tipContratto ;
    return this.http.get<Dipendente[]>( url );
  }//filtri

  public getDipendentiNome( nome:String ): Observable<Dipendente[]> {
    const url = this.backendUrl+'/dipendenti/'+nome ;
    return this.http.get<Dipendente[]>( url );
  }//Get dipendenti by nome

  //CONTRATTO
  public getAllContratti(): Observable<ContrattoLavorativo[]> {
    const url = this.backendUrl+'/contratti' ;
    return this.http.get<ContrattoLavorativo[]>( url );
  }//Get all contratto

  public getContrattoId( id:number ): Observable<ContrattoLavorativo> {
    const url = this.backendUrl+'/contratto/'+id.toString ;
    return this.http.get<ContrattoLavorativo>( url );
  }//Get contratto id

  public getContrattoDipendente( id:number ): Observable<ContrattoLavorativo> {
    const url = this.backendUrl+'/contrattoDipendente/'+id.toString ;
    return this.http.get<ContrattoLavorativo>( url );
  }//Get contratto dipendente


}
