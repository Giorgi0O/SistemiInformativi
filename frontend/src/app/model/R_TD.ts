import { Dipendente } from "./Dipendente";
import { TurnoLavorativo } from "./TurnoLavorativo";

export interface R_TD{

    id:number;
    dipendente:Dipendente;
    turnoLavorativo:TurnoLavorativo;
    straordinario:boolean;
    turnoLavorativoDate:Date;

}

export class R_TD{

    id!:number;
    dipendente:Dipendente;
    turnoLavorativo:TurnoLavorativo;
    straordinario:boolean;
    turnoLavorativoDate:Date;

    constructor(dip:Dipendente, turno:TurnoLavorativo, s:boolean, d:Date){
        this.dipendente = this.dipendente;
        this.turnoLavorativo = turno;
        this.straordinario = this.straordinario;
        this.turnoLavorativoDate = d;
    }

}