import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { Dipendente } from 'src/app/model/Dipendente';
import { R_TD } from 'src/app/model/R_TD';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RtdService } from 'src/app/service/rtd.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

@Component({
  selector: 'app-modifica-turni',
  templateUrl: './modifica-turni.component.html',
  styleUrls: ['./modifica-turni.component.css']
})
export class ModificaTurniComponent implements OnInit {

  dipendenti:Dipendente[] = [];
  rtdVecchi:R_TD[] = [];
  turni:TurnoLavorativo[] =[];
  modifyForm!:FormGroup;
  valid:boolean= false;

  constructor(private ser:DipendentiService , private tur:TurnoLavorativoService, private rtd:RtdService){}

  ngOnInit(): void {
    this.getDipendenti();
    this.prelevaTurni();
    this.modifyForm = new FormGroup({
      data: new FormControl(null, Validators.required),
      turno: new FormControl(null, Validators.required),
      rtdVecchio: new FormControl(),
      dipendenti: new FormArray([]),
      straordinario: new FormArray([])
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
  public prelevaTurni(){
    this.tur.listaTurniRead().subscribe({
      next:response =>{ this.turni = response },
      error:error =>{ alert(error); }
    });
  }
  onCheckboxChange(event:any){
    const selectedDipendente = (this.modifyForm.controls['dipendenti'] as FormArray);

    if (event.target.checked){
      selectedDipendente.push( new FormControl(event.target.value) );
    }else {
        const index = selectedDipendente.controls
        .findIndex(x => x.value === event.target.value);
        selectedDipendente.removeAt(index);
    }
  }
  public dipendenteTurno(){
    this.rtd.filtriRTD(this.modifyForm.value.data, -1).subscribe({
      next:response =>{
        for( let r of response ){
          if( r.turnoLavorativo.id == this.modifyForm.value.turno ){
            this.rtdVecchi.push(r);
          }
        }
        this.valid = true;
      }
    })
  }
  public updateRTD(){
    const data = this.creaData();
    const turno = this.modifyForm.value.turno;
    const dip = this.modifyForm.value.dipendenti;
    const nuovoRtd = new R_TD(dip, turno , true, data);
    console.log(nuovoRtd);
    
    /*
    this.rtd.updateRTD( this.modifyForm.value.rtdVecchio,creato ).subscribe({
      next:response =>( alert("Turno modificato")),
      error:error =>(alert("turno NON modificato , riprova!"))
    })
    */
  }
  private contains(id:number):boolean{
    for( let i=0; i < this.modifyForm.value.straordinario.length ;i++ ){
      if( this.modifyForm.value.straordinario == id ){
        return true;
      }
    }
    return false;
  }
  private creaData():Date{
    const dateString = this. modifyForm.value.data;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day); 
    return date;
  }
  onCheckboxChangeS(event:any){
    const selectedStraordinario = (this.modifyForm.controls['straordinario'] as FormArray);

    if (event.target.checked){
      selectedStraordinario.push( new FormControl(event.target.value) );
    }else {
        const index = selectedStraordinario.controls
        .findIndex(x => x.value === event.target.value);
        selectedStraordinario.removeAt(index);
    }
  }








}
