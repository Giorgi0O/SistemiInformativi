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

export class Dipendente implements Dipendente{

    id!:number;
    nome!:String;
    cognome!:String;
    email!:String;
    telefono!:number;
    sede!:String;
    contrattoLavorativo!:ContrattoLavorativo;
    ruolo!:Ruolo;
    giornateFeriali!:GiornataFeriale[];

    constructor(nome:String,cognome:String,ruolo:Ruolo,telefono:number,
         sede:String,email:String,contrattoLavorativo:ContrattoLavorativo){
        this.nome = nome;
        this.cognome = cognome; 
        this.ruolo = ruolo;
        this.telefono = telefono; 
        this.email = email;
        this.sede = sede;
        this.contrattoLavorativo = contrattoLavorativo;
    }
}