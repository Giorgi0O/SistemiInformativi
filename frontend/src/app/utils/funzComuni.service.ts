import { Injectable } from "@angular/core";
import { DipendentiService } from "../service/dipendenti.service";
import { Dipendente } from "../model/Dipendente";
import { TurnoLavorativoService } from "../service/turno-lavorativo.service";
import { TurnoLavorativo } from "../model/TurnoLavorativo";
import { RuoloService } from "../service/ruolo.service";
import { Ruolo } from "../model/Ruolo";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class funzComuniService {

    dipendenti:Dipendente[] = [];
    turni:TurnoLavorativo[] = [];
    ruoli:Ruolo[] = [];

    TOKEN_KEY:string = 'auth-token';
    USER_KEY:string = 'auth-user';

    constructor( private ser:DipendentiService,
      private tur:TurnoLavorativoService,
      private rol:RuoloService ){}

    public getDipendenti():Dipendente[]{
      if( this.dipendenti.length == 0 ){
        this.ser.getDipendenti().subscribe(
          {
            next:response=>( response.map( r => { this.dipendenti.push(r) } )),
            error:error=> ( console.log(error.message) )
          }
        );
      }
      return this.dipendenti;
    }

    public getTurni():TurnoLavorativo[]{
      if( this.turni.length == 0 ){
        this.tur.listaTurniRead().subscribe({
          next:response =>{  console.log(response);response.map(t => (this.turni.push(t))) },
          error:error =>{ console.log(error); }
        });
      }
      return this.turni;
    }

    public getRuoli():Ruolo[]{
      if( this.ruoli.length == 0){
        this.rol.listaRuoloRead().subscribe(
          {
            next:response=>( response.map(t => (this.ruoli.push(t)))  ),
            error:error=> ( console.log(error.message) )
          }
        );
      }
      return this.ruoli;
    }

    signOut(): void {
      window.sessionStorage.clear();
    }

    public isLogged( role:String ){
      if( role === "direttoreCS"){
        return this.getToken() !== null && this.getRole()[0] === role ;
      }
      return this.getToken() !== null && this.getRole()[1] === role ;
    }

    public getRole(){
      const token = this.getToken();
      if( token !== null ){
        const dplay = JSON.parse( atob( token.split('.')[1] ) );
        return dplay.realm_access.roles;
      }
      return "";
    }

    public saveToken( token:string ){
      window.sessionStorage.removeItem(this.TOKEN_KEY);
      window.sessionStorage.setItem(this.TOKEN_KEY, token);
    }
    

    public getToken(): any {
      return window.sessionStorage.getItem( this.TOKEN_KEY );
    }

    public saveUser(user: any): void {
      window.sessionStorage.removeItem( this.USER_KEY );
      window.sessionStorage.setItem( this.USER_KEY, JSON.stringify(user) );
    }

    public getUser(): any {
      const user = window.sessionStorage.getItem(this.USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
      return {};
    }

    

}