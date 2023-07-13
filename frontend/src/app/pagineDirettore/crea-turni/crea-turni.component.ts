import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { DtoRTD } from 'src/app/model/DtoRTd';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RtdService } from 'src/app/service/rtd.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';
import { funzComuniService } from 'src/app/utils/funzComuni.service';

@Component({
  selector: 'app-crea-turni',
  templateUrl: './crea-turni.component.html',
  styleUrls: ['./crea-turni.component.css']
})
export class CreaTurniComponent implements OnInit{

  buttonDisable:boolean= false; 

  dipendenti:Dipendente[] = [];
  dipendentiTurno:Dipendente[] = [];
  turni:TurnoLavorativo[] =[];
  createForm!:FormGroup;

  constructor(private fun:funzComuniService, private ser:DipendentiService , private tur:TurnoLavorativoService, private rtd:RtdService){}

  ngOnInit(){
    this.dipendenti = this.fun.getDipendenti();;
    this.turni = this.fun.getTurni();
    this.createForm = new FormGroup({
      data: new FormControl(null, Validators.required),
      turno: new FormControl(null , Validators.required),
      dipendenti: new FormArray([]),
      straordinario: new FormArray([])
    });
  }
  public createRtd(){
    this.buttonDisable = true;
    const data:Date = this.creaData();
    const turno:number = this.createForm.value.turno;
    let dip= this.createForm.value.dipendenti;
    if( this.createForm.value.dipendenti.length == 0 && this.createForm.value.straordinario.length > 0 ){
      dip= this.createForm.value.straordinario;
    }
    console.log(dip, turno,data);
    for( let i of dip ){
      const s = this.contains(i);
      const dto = new DtoRTD(data, s);
      this.rtd.createRTD( i, turno, dto ).subscribe({
        next:response =>{
          alert("Turno aggiunto");
          this.buttonDisable = false;
      },
        error:error =>{
          alert("ops, turno lavorativo non aggiunto");
          this.buttonDisable = false;
      }
      })
    }
  }
  private contains(id:number):boolean{
    for( let s of this.createForm.value.straordinario ){
      if( s == id ){
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
