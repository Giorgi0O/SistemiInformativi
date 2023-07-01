import { Component } from '@angular/core';

@Component({
  selector: 'app-turnisettimanali',
  templateUrl: './turnisettimanali.component.html',
  styleUrls: ['./turnisettimanali.component.css']
})
export class TurnisettimanaliComponent {
  date:Date= new Date;
  mese:string = this.date.toISOString().split('T')[0];

  giorno:number = this.date.getDate();

  giornoMeno(){
    this.date.setDate( this.date.getDate()-1 );
    this.mese = this.date.toISOString().split('T')[0];
  }
  giornoPiu(){
    this.date.setDate( this.date.getDate()+1 );
    this.mese = this.date.toISOString().split('T')[0];
  }

}
