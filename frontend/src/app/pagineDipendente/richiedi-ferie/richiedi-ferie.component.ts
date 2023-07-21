import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {GiornataFerieService} from "../../service/giornata-ferie.service";
import {Dipendente} from "../../model/Dipendente";

@Component({
  selector: 'app-richiedi-ferie',
  templateUrl: './richiedi-ferie.component.html',
  styleUrls: ['./richiedi-ferie.component.css']
})
export class RichiediFerieComponent {

  disData:boolean = true;

  constructor(private gf:GiornataFerieService) {
  }


  public disponibilitaData(data:string): Observable<boolean>{
    return this.gf.disponibilitaData(data);
  }

  public richiediFerie(dipendente:Dipendente,data:String){
    this.gf.richiediFerie(data,dipendente);
  }



  public trovaDisponibilitaData(){
    this.disponibilitaData("data").subscribe(
      {
        next: response => {
          this.disData = response;
        },
        error: error => {
          console.log(error.message)
        }
      }
    );
  }



}
