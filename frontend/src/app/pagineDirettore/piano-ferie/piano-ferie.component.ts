import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { GiornataFerieService } from 'src/app/service/giornata-ferie.service';
import { RuoloService } from 'src/app/service/ruolo.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';
import { funzComuniService } from 'src/app/utils/funzComuni.service';

@Component({
  selector: 'app-piano-ferie',
  templateUrl: './piano-ferie.component.html',
  styleUrls: ['./piano-ferie.component.css']
})
export class PianoFerieComponent implements OnInit {

  date:Date= new Date();
  tutteDate:String[]= [];

  dataFormattata:String = this.datePipe.transform(this.date, "yyyy-MM-dd") || " ";
  visData:String = this.dataFormattata;

  giorno:number = this.date.getDate();

  daysOfWeek:String[] = ['Domenica','Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

  ruoli:Ruolo[] = [];
  ferie!:Map<String, Dipendente[]>; 
  
  filtriForm!:FormGroup;
  

  constructor( private fun:funzComuniService, private tur:TurnoLavorativoService, private datePipe:DatePipe, private dip:DipendentiService, private rol:RuoloService, private gio:GiornataFerieService ){}

  ngOnInit(){
    this.ruoli = this.fun.getRuoli();
    this.filtriForm = new FormGroup({
      data : new FormControl(this.datePipe.transform(this.date , "yyyy-MM-dd") , Validators.required ),
      ruolo : new FormControl("nessuno")
    });
    this.ferie = new Map<String,Dipendente[]>;
    this.calcolcaFerie();
  }
  giornoMeno(){
    this.date.setDate( this.date.getDate()-7 );
    this.visData = this.date.toISOString().split('T')[0];
    this.giorno = this.date.getDate();
    this.tutteDate = [];
    this.ferie.clear();
    this.calcolcaFerie();
  }
  giornoPiu(){
    this.date.setDate( this.date.getDate()+7 );
    this.visData = this.date.toISOString().split('T')[0];
    this.giorno = this.date.getDate();
    this.tutteDate = [];
    this.ferie.clear();
    this.calcolcaFerie();
  }
  public calcolcaFerie(){
    const dataFine: Date = new Date();
    dataFine.setDate(this.date.getDate() + 6);

    const cd = new Date();
    cd.setDate(this.date.getDate())

    for (let currentDate= cd; currentDate <= dataFine; currentDate.setDate(currentDate.getDate() + 1)) {
      const d = new Date(currentDate);
      const formattata = this.datePipe.transform(d , "yyyy-MM-dd");
      const chiave = formattata ?? '';
      this.tutteDate.push(chiave);
      this.ferie.set( chiave , []);
      this.dipendenteFerie(d);
    }
  }//calcola ferie
  public mapToArray(data:String): Dipendente[]|undefined {
    return this.ferie.get(data);
  }
  public dipendenteFerie(d:Date){
    this.gio.listaRfd().subscribe({
      next:response =>{
        for( let r of response ){
          const dd = this.datePipe.transform(d , "yyyy-MM-dd");
          if( r.giornataFeriale.dataGiornataFeriale.toString() === dd?.toString() ){
            if( this.filtriForm.value.ruolo === "nessuno"){
              this.ferie.get(dd)?.push(r.dipendente);
            }
            if( r.dipendente.ruolo.nome === this.filtriForm.value.ruolo ){
              this.ferie.get(dd)?.push(r.dipendente);
            }
          }
        }
      }
    })
  }
  public async filtriFerie(){
    this.gio.getFerieFiltri(this.filtriForm.value.data , this.filtriForm.value.ruolo ).subscribe({
      next: () =>{
        this.cambioData();
        this.tutteDate = [];
        this.ferie.clear();
        this.calcolcaFerie();
      }
    })
  }
  private cambioData():void{
    const dateString = this.filtriForm.value.data;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day); 
    this.date.setDate( date.getDate() );
    this.visData = this.date.toISOString().split('T')[0];
    this.giorno = this.date.getDate();
  }

}
