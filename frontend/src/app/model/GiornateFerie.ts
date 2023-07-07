import {Ruolo} from "./Ruolo";
import {ContrattoLavorativo} from "./ContrattoLavorativo";

export interface GiornataFeriale{

    id:number;
    dataGiornataFeriale:Date;

}

export class GiornataFeriale{

  id!:number;
  dataGiornataFeriale:Date;

  constructor(dataGiornataFeriale:Date){
    this.dataGiornataFeriale = dataGiornataFeriale;
  }

}
