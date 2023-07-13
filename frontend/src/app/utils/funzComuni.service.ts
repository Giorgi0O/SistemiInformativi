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
      if( this.turni.length != 0 ){
        this.tur.listaTurniRead().subscribe({
          next:response =>{ response.map(t => (this.turni.push(t))) },
          error:error =>{ alert(error); }
        });
      }
      return this.turni;
    }

    public getRuoli():Ruolo[]{
      if( this.ruoli.length == 0){
        this.rol.listaRuoloRead().subscribe(
          {
            next:response=>( response.map(t => (this.ruoli.push(t)))  ),
            error:error=> ( alert(error.message) )
          }
        );
      }
      return this.ruoli;
    }

}