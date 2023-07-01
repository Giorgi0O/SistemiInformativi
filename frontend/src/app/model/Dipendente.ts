import { ContrattoLavorativo } from "./ContrattoLavorativo";
import { GiornataFeriale } from "./GiornateFerie";
import { Ruolo } from "./Ruolo";

export interface Dipendente{
    id:number;
    nome:String;
    cognome:String;
    email:String;
    telefono:number;
    sede:String;
    contrattoLavorativo:ContrattoLavorativo;
    ruolo:Ruolo;
    giornateFeriali:GiornataFeriale[];

}