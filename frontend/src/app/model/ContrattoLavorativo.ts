export interface ContrattoLavorativo{
    
    id:number,
    descrizione:String,
    tipologia:String,

}

export class ContrattoLavorativo implements ContrattoLavorativo{
    
    id!:number;
    descrizione!:String;
    tipologia!:String;

    constructor(tipologia:String, descrizione:String ){
        this.tipologia = tipologia;
        this.descrizione = descrizione;
    }


}