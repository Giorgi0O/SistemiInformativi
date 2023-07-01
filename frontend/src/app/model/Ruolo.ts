export interface Ruolo{

    id:number;
    nome:String;

}

export class Ruolo implements Ruolo{

    id!:number;
    nome!:String;

    constructor( nome:String ){
        this.nome = nome;
    }

}