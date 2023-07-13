import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import {GiornataFerieService} from "../../service/giornata-ferie.service";
import {GiornataFeriale} from "../../model/GiornateFerie";
import { funzComuniService } from 'src/app/utils/funzComuni.service';

@Component({
  selector: 'app-crea-ferie',
  templateUrl: './crea-ferie.component.html',
  styleUrls: ['./crea-ferie.component.css']
})
export class CreaFerieComponent {

  createButton:boolean = false;
  
  dipendenti:Dipendente[] = [];
  dipendentiFerie:Dipendente[] = [];
  createForm!:FormGroup;

  constructor( private fun:funzComuniService, private ser:DipendentiService , private fer:GiornataFerieService){}

  ngOnInit(){
    this.dipendenti = this.fun.getDipendenti();
    this.createForm = new FormGroup({
      dataInizio: new FormControl(null, Validators.required),
      dataFine: new FormControl(null, Validators.required),
      dipendenti: new FormArray([], Validators.required)
    });
  }
  public createRfd(){
    this.createButton = true;
    let responseMessage;
    const dataInizio:Date = this.creaData(this.createForm.value.dataInizio);
    const dataFine:Date = this.creaData(this.createForm.value.dataFine);
    for( let i of this.createForm.value.dipendenti ){
      for (let currentDate = dataInizio; currentDate <= dataFine; currentDate.setDate(currentDate.getDate() + 1)) {
        let giornataFeriale = new GiornataFeriale(currentDate);
        this.fer.createGiornataFerie(i,giornataFeriale).subscribe({
          next: response => {  responseMessage = response; this.createButton = false; },
          error: error => {
            alert("ops,la giornata ferie: "+currentDate.getDate()+" non è stata aggiunta");
            this.createButton = false
          }
        })
      }
    }
    if( responseMessage == null ){alert("Giornata Ferie aggiunta!")}
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
