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

  rtdVecchi:R_TD[] = [];
  turni:TurnoLavorativo[] =[];
  modifyForm!:FormGroup;
  valid:boolean= false;

  constructor(private ser:DipendentiService , private tur:TurnoLavorativoService, private rtd:RtdService){}

  ngOnInit(): void {
    this.prelevaTurni();
    this.modifyForm = new FormGroup({
      data: new FormControl(null, Validators.required),
      turno: new FormControl(null, Validators.required),
      rtdVecchio: new FormArray([]),
    });
  }

  public prelevaTurni(){
    this.tur.listaTurniRead().subscribe({
      next:response =>{ this.turni = response },
      error:error =>{ alert(error); }
    });
  }
  onCheckboxChange(event:any){
    const selectedDipendente = (this.modifyForm.controls['rtdVecchio'] as FormArray);

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
  public deleteRtd(){
    for( let r of this.modifyForm.value.rtdVecchio ){
      this.rtd.deleteRTD(r).subscribe({
        next:response =>{ 
          alert("Turno eleminato!");
          window.location.reload();
        },
        error:error =>( console.log(error) )
      })
    }
    this.modifyForm.reset();
  }










}
