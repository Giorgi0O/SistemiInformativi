export interface DtoRTD{

    data:Date,
    straordinario:boolean,
}

export class DtoRTD{

    data:Date;
    straordinario:boolean;

    constructor(d:Date, s:boolean){
        this.data = d;
        this.straordinario = s;
    }
}