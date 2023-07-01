import { Time } from "@angular/common";

export interface TurnoLavorativo{

    id:number;
    turnoLavorativoDate:Date;
    oraInizio:String;
    oraFine:String;

}

export class TurnoLavorativo implements TurnoLavorativo{
    public id: number;
    public turnoLavorativoDate:Date;
    public oraInizio:String;
    public oraFine:String;


    constructor( d:Date , oi:String , of :String ){
        var random = Math.random();
        this.id = random;
        this.turnoLavorativoDate = d;
        this.oraInizio = oi;
        this.oraFine = of;
    }

}