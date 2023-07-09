import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';
import {RtdService} from "../../service/rtd.service";
import {ContrattoLavorativo} from "../../model/ContrattoLavorativo";
import {DtoRTD} from "../../model/DtoRTd";
import {GiornataFerieService} from "../../service/giornata-ferie.service";
import {GiornataFeriale} from "../../model/GiornateFerie";

@Component({
  selector: 'app-crea-ferie',
  templateUrl: './crea-ferie.component.html',
  styleUrls: ['./crea-ferie.component.css']
})
export class CreaFerieComponent {

  dipendenti:Dipendente[] = [];
  dipendentiFerie:Dipendente[] = [];
  ferie:GiornataFeriale[] =[];
  createForm!:FormGroup;

  constructor(private ser:DipendentiService , private fer:GiornataFerieService){}

  ngOnInit(){
    this.getDipendenti();
    this.prelevaFerie();
    this.createForm = new FormGroup({
      dataInizio: new FormControl(null, Validators.required),
      dataFine: new FormControl(null, Validators.required),
      dipendenti: new FormArray([], Validators.required)
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
  public createRfd(){
    const dataInizio:Date = this.creaData(this.createForm.value.dataInizio);
    const dataFine:Date = this.creaData(this.createForm.value.dataFine);
    for( let i of this.createForm.value.dipendenti ){
      for (let currentDate = dataInizio; currentDate <= dataFine; currentDate.setDate(currentDate.getDate() + 1)) {
        let giornataFeriale = new GiornataFeriale(currentDate);
        this.fer.createGiornataFerie(i,giornataFeriale).subscribe({
          next: response => {  alert("giornata Ferie aggiunta");
        },
          error: error => (alert("ops,la giornata ferie"+currentDate+"non è stata aggiunta"))
        })
      }
    }
  }
  private creaData(data:String):Date{
    const dateString = data;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return date;
  }
  public prelevaFerie(){
    this.fer.listaFerieRead().subscribe({
      next:response =>{ this.ferie = response },
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

}
