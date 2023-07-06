import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { R_TD } from 'src/app/model/R_TD';
import { Ruolo } from 'src/app/model/Ruolo';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { GiornataFerieService } from 'src/app/service/giornata-ferie.service';
import { RtdService } from 'src/app/service/rtd.service';
import { RuoloService } from 'src/app/service/ruolo.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

@Component({
  selector: 'app-piano-ferie',
  templateUrl: './piano-ferie.component.html',
  styleUrls: ['./piano-ferie.component.css']
})
export class PianoFerieComponent implements OnInit {

  date:Date= new Date;
  mese:string = this.date.toLocaleDateString();

  giorno:number = this.date.getDate();

  daysOfWeek:String[] = ['Domenica','Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

  turniQuotidiani:R_TD[] = [];
  dipendenti:Dipendente[] =[];
  ruoli:Ruolo[] = [];

  filtriForm!:FormGroup;

  turniLavorativi:TurnoLavorativo[] = []

  constructor( private tur:TurnoLavorativoService, private datePipe:DatePipe, private rtd:RtdService, private dip:DipendentiService, private rol:RuoloService, private gio:GiornataFerieService ){}

  ngOnInit(){
    this.prendiRuoli();
    this.filtriForm = new FormGroup({
      data: new FormControl(this.datePipe.transform(this.date , "yyyy-MM-dd")),
      id: new FormControl()
    })
  }
  public dipendenteXdata( data:Date ):Dipendente[]{
    let lista:Dipendente[] = []
    const formattedDate:String|null = this.datePipe.transform(this.date , "yyyy-MM-dd");
    this.rtd.filtriRTD( formattedDate , -1).subscribe({
      next:response =>{ this.turniQuotidiani = response; console.log(response) },
      error:error =>{ alert(error); }
    });
    return lista;
  }
  public getDipendenti():void{
    this.dip.getDipendenti().subscribe(
      {
        next:response=>( this.dipendenti = response ),
        error:error=> ( console.log(error.message) )
      }
    );
  }
  public filtriFerie():void{
    console.log(this.date.getDate() );
  }
  private cambioData():void{
    this.mese = this.filtriForm.value.data;
    const dateString = this.filtriForm.value.data;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10)+1;
    const date = new Date(year, month, day); 
    this.date = date;
    console.log(date);
  }

  public prendiRuoli():void{
    this.rol.listaRuoloRead().subscribe(
      {
        next:response=>( this.ruoli = response ),
        error:error=> ( alert(error.message) )
      }
    );
  }

}
