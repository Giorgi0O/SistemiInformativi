import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
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
  dipendentiTurno:Dipendente[] = [];
  turni:TurnoLavorativo[] =[];
  modifyForm!:FormGroup;

  constructor(private ser:DipendentiService , private tur:TurnoLavorativoService, private rtd:RtdService){}

  ngOnInit(): void {
    this.getDipendenti();
    this.prelevaTurni();
    this.modifyForm = new FormGroup({
      data: new FormControl(),
      turno: new FormControl(),
      dipendenti: new FormArray([])
    })
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








}
