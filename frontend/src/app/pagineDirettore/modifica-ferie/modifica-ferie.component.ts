import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { rfd } from 'src/app/model/rfd';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { GiornataFerieService } from 'src/app/service/giornata-ferie.service';
import { RtdService } from 'src/app/service/rtd.service';
import { TurnoLavorativoService } from 'src/app/service/turno-lavorativo.service';

@Component({
  selector: 'app-modifica-ferie',
  templateUrl: './modifica-ferie.component.html',
  styleUrls: ['./modifica-ferie.component.css']
})
export class ModificaFerieComponent {

  rfdVecchi:rfd[] = [];
  modifyForm!:FormGroup;
  valid:boolean= false;

  constructor(private gio:GiornataFerieService){}

  ngOnInit(): void {
    this.modifyForm = new FormGroup({
      dataInizio: new FormControl(null, Validators.required),
      dataFine: new FormControl(null, Validators.required),
      rfdVecchi: new FormArray([]),
    });
  }
  onCheckboxChange(event:any){
    const selectedDipendente = (this.modifyForm.controls['rfdVecchi'] as FormArray);

    if (event.target.checked){
      selectedDipendente.push( new FormControl(event.target.value) );
    }else {
        const index = selectedDipendente.controls
        .findIndex(x => x.value === event.target.value);
        selectedDipendente.removeAt(index);
    }
  }
  public deleteRtd(){
    let idlist:number[] = [];
    for( let r of this.modifyForm.value.rfdVecchi ){
      idlist.push(Number.parseInt(r));
    }
    this.gio.deleteGiornataFerie(idlist).subscribe({
      next:response =>{ alert("Giornata ferie eleminata!") },
      error:error =>( alert("ops , Giornata ferie non aggiunta, riprova !")  )
    })
    this.modifyForm.reset();
  }
  public dipendenteFerie(){
    
    const dataInizio = this.creaData( this.modifyForm.value.dataInizio );
    const dataFine = this.creaData( this.modifyForm.value.dataFine );
    this.gio.listaRfd().subscribe({
      next:response =>{
        for( let r of response ){
          const data = this.creaData( r.giornataFeriale.dataGiornataFeriale.toString() );
          if( data <= dataFine && data >= dataInizio ){
            this.rfdVecchi.push(r);
          }
        }
        this.valid = true;
      }
    })
  }//dipendenteFerie
  private creaData( d:String ):Date{
    const dateString = d;
    const parts = dateString.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day); 
    return date;
  }

}
