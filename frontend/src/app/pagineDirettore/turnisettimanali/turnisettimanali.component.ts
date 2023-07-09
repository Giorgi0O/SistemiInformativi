import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { R_TD } from 'src/app/model/R_TD';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RtdService } from 'src/app/service/rtd.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

@Component({
  selector: 'app-turnisettimanali',
  templateUrl: './turnisettimanali.component.html',
  styleUrls: ['./turnisettimanali.component.css']
})
export class TurnisettimanaliComponent implements OnInit {

  turniQuotidiani:R_TD[] = [];
  dipendenti:Dipendente[] =[]

  filtriForm!:FormGroup;

  date:Date= new Date;
  mese:string = this.date.toISOString().split('T')[0];
  giorno:number = this.date.getDate();

  turniLavorativi:TurnoLavorativo[] = []

  constructor( private tur:TurnoLavorativoService, private datePipe:DatePipe, private rtd:RtdService, private dip:DipendentiService ){}
  giornoMeno(){
    this.date.setDate( this.date.getDate()-1 );
    this.mese = this.date.toISOString().split('T')[0];
    this.prelevaRtd();
  }
  giornoPiu(){
    this.date.setDate( this.date.getDate()+1 );
    this.mese = this.date.toISOString().split('T')[0];
    this.prelevaRtd(); 
  }
  ngOnInit(){
    this.prelevaRtd();
    this.prelevaTurni();
    this.getDipendenti();
    this.filtriForm = new FormGroup({
      data: new FormControl(this.datePipe.transform(this.date , "yyyy-MM-dd")),
      id: new FormControl()
    })
  }
  public prelevaRtd(){
    const formattedDate:String|null = this.datePipe.transform(this.date , "yyyy-MM-dd");
    this.rtd.filtriRTD( formattedDate , -1).subscribe({
      next:response =>{ this.turniQuotidiani = response;},
      error:error =>{ alert(error); }
    });
  }
  public prelevaTurni(){
    this.tur.listaTurniRead().subscribe({
      next:response =>{ this.turniLavorativi = response },
      error:error =>{ alert(error); }
    });
  }
  public getDipendenti():void{
    this.dip.getDipendenti().subscribe(
      {
        next:response=>( this.dipendenti = response ),
        error:error=> ( console.log(error.message) )
      }
    );
  }
  public filtriTurni():void{
    this.cambioData(); 
    let dip = -1
    if( this.filtriForm.value.id != null ) {
      console.log(this.filtriForm.value.id);
      dip = this.filtriForm.value.id;
    }
    console.log(dip);
    if( this.filtriForm.value.data != null ){
      this.rtd.filtriRTD( this.filtriForm.value.data , dip).subscribe({
        next:response =>{ 
          this.turniQuotidiani = response;
          console.log(this.turniQuotidiani)
        },
        error:error =>{ alert("ATTENZIONE: inserisci una data corretta"); }
      });
    }else{
      this.prelevaRtd()
    }
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
  }
}
