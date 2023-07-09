import { Time } from "@angular/common";

export interface TurnoLavorativo{

    id:number;
    oraInizio:String;
    oraFine:String;

}

export class TurnoLavorativo implements TurnoLavorativo{
    public id: number;
    public oraInizio:String;
    public oraFine:String;


    constructor( oi:String , of :String ){
        var random = Math.random();
        this.id = random;
        this.oraInizio = oi;
        this.oraFine = of;
    }

}