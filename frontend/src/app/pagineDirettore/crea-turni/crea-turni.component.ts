import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { DtoRTD } from 'src/app/model/DtoRTd';
import { R_TD } from 'src/app/model/R_TD';
import { Ruolo } from 'src/app/model/Ruolo';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RtdService } from 'src/app/service/rtd.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

@Component({
  selector: 'app-crea-turni',
  templateUrl: './crea-turni.component.html',
  styleUrls: ['./crea-turni.component.css']
})
export class CreaTurniComponent implements OnInit{

  dipendenti:Dipendente[] = [];
  dipendentiTurno:Dipendente[] = [];
  turni:TurnoLavorativo[] =[];
  createForm!:FormGroup;

  constructor(private ser:DipendentiService , private tur:TurnoLavorativoService, private rtd:RtdService){}

  ngOnInit(){
    this.getDipendenti();
    this.prelevaTurni();
    this.createForm = new FormGroup({
      data: new FormControl(null, Validators.required),
      turno: new FormControl(null , Validators.required),
      dipendenti: new FormArray([], Validators.required),
      straordinario: new FormArray([], Validators.required)
    });
  }

  public getDipendenti():void{
    this.ser.getDipendenti().subscribe(
      {
        next:response=>( this.dipendenti = response ),
        error:error=> ( console.log(error.message) )
      }
    );
  }
  public createRtd(){
    const data:Date = this.creaData();
    const turno:number = this.createForm.value.turno;
    for( let i of this.createForm.value.dipendenti ){
      const s= this.contains(i);
      const dto = new DtoRTD(data, s);
      this.rtd.createRTD(i, turno, dto ).subscribe({
        next:response =>(alert("turno lavorativo aggiunto")),
        error:error =>(alert("ops, turno lavorativo non aggiunto"))
      })
    }
  }
  private contains(id:number):boolean{
    for( let i=0; i < this.createForm.value.straordinario.length ;i++ ){
      if( this.createForm.value.straordinario == id ){
        return true;
      }
    }
    return false;
  }
  private creaData():Date{
    const dateString = this.createForm.value.data;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day); 
    return date;
  }
  public prelevaTurni(){
    this.tur.listaTurniRead().subscribe({
      next:response =>{ this.turni = response },
      error:error =>{ alert(error); }
    });
  }
  onCheckboxChange(event:any){
    const selectedDipendente = (this.createForm.controls['dipendenti'] as FormArray);

    if (event.target.checked){
      selectedDipendente.push( new FormControl(event.target.value) );
    }else {
        const index = selectedDipendente.controls
        .findIndex(x => x.value === event.target.value);
        selectedDipendente.removeAt(index);
    }
  }
  onCheckboxChangeS(event:any){
    const selectedStraordinario = (this.createForm.controls['straordinario'] as FormArray);

    if (event.target.checked){
      selectedStraordinario.push( new FormControl(event.target.value) );
    }else {
        const index = selectedStraordinario.controls
        .findIndex(x => x.value === event.target.value);
        selectedStraordinario.removeAt(index);
    }
  }


  
}
