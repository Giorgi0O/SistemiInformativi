import { Dipendente } from "./Dipendente";
import { GiornataFeriale } from "./GiornateFerie";

export interface rfd{
    id:number,
    dipendente:Dipendente,
    giornataFeriale:GiornataFeriale
}

export class rfd implements rfd {
    id!:number;
    dipendente:Dipendente;
    giornataFeriale:GiornataFeriale;

    constructor(dip:Dipendente, gf:GiornataFeriale){
        this.dipendente = dip;
        this.giornataFeriale = gf;
    }
}