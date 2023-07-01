import { Component } from '@angular/core';

@Component({
  selector: 'app-piano-ferie',
  templateUrl: './piano-ferie.component.html',
  styleUrls: ['./piano-ferie.component.css']
})
export class PianoFerieComponent {

  date:Date= new Date;
  mese:string = this.date.toLocaleDateString();

  giorno:number = this.date.getDate();
}
