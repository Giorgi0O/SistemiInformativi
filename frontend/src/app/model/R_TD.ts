import { Dipendente } from "./Dipendente";
import { TurnoLavorativo } from "./TurnoLavorativo";

export interface R_TD{

    id:number;
    dipendente:Dipendente;
    turnoLavorativo:TurnoLavorativo;
    staordinario:boolean;

}