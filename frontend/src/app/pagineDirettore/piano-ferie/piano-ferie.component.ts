import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { rfd } from 'src/app/model/rfd';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { GiornataFerieService } from 'src/app/service/giornata-ferie.service';
import { RuoloService } from 'src/app/service/ruolo.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

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

  giornataFerie!:rfd[];
  
  filtriForm!:FormGroup;
  

  constructor( private tur:TurnoLavorativoService, private datePipe:DatePipe, private dip:DipendentiService, private rol:RuoloService, private gio:GiornataFerieService ){}

  ngOnInit(){
    this.prendiRuoli();
    this.giornataFerie = [];
    this.filtriForm = new FormGroup({
      data : new FormControl(),
      ruolo : new FormControl()
    });
    this.ferie = new Map<String,Dipendente[]>;
    this.calcolcaFerie();
    console.log(this.tutteDate.length)
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

  public dipendenteFerie(d:Date){
    this.gio.listaRfd().subscribe({
      next:response =>{
        for( let r of response ){
          const dd = this.datePipe.transform(d , "yyyy-MM-dd");
          if( r.giornataFeriale.dataGiornataFeriale.toString() === dd?.toString() ){
            this.ferie.get(dd)?.push(r.dipendente);
          }//if
        }//for
      }//next
    })//subscribe
  }//dipendenteFerie
  public prendiRuoli():void{
    this.rol.listaRuoloRead().subscribe(
      {
        next:response=>( this.ruoli = response ),
        error:error=> ( alert(error.message) )
      }
    );
  }

  public filtriFerie(){
    console.log(this.filtriForm);
  }

  private trovaRuolo():Ruolo{
    let trovato = this.ruoli[0];
    for( const r of this.ruoli ){
      if( r.id == this.filtriForm.value.ruolo ){
        trovato = r;
      }
    }
    return trovato;
  }

}
