import { Component, OnInit } from '@angular/core';
import {Observable, map} from "rxjs";
import {GiornataFerieService} from "../../service/giornata-ferie.service";
import {Dipendente} from "../../model/Dipendente";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rfd } from 'src/app/model/rfd';
import { DatePipe } from '@angular/common';
import { funzComuniService } from 'src/app/utils/funzComuni.service';
import { DipendentiService } from 'src/app/service/dipendenti.service';

@Component({
  selector: 'app-richiedi-ferie',
  templateUrl: './richiedi-ferie.component.html',
  styleUrls: ['./richiedi-ferie.component.css']
})
export class RichiediFerieComponent implements OnInit{

  disferie:String[] = [];
  disRfd:rfd[] = [];
  elimina: boolean = false;

  formFerie!:FormGroup;
  dipendente!:Dipendente;

  daEliminare!:rfd;

  disponibili:boolean = false;


  constructor(  private ser:DipendentiService , private fun:funzComuniService, private gf:GiornataFerieService, private datePipe:DatePipe ) {}


  ngOnInit(): void {
    this.trovaDipendente();
    this.formFerie = new FormGroup({
      datainizio: new FormControl(null, Validators.required), 
      datafine: new FormControl(null, Validators.required)
    })
  }

  

  trovaDipendente(){
    const user = this.fun.getUsername();
    this.ser.getDipendenteEmail(user).subscribe({
      next: response =>{ this.dipendente = response; this.recuperaFerie(response.id) }
    })
  }

  public richiestaDelete(el:rfd){
    this.elimina = true;
    this.daEliminare = el;
  }

  public annulla(){
    this.elimina = false;
  }

  public deleteRfd(){
    this.elimina = false;
    this.gf.deleteGiornataFerie(this.daEliminare.id).subscribe({
      error:error=>(console.log(error))
    })
  }


  public recuperaFerie(id:number){
    this.gf.getFerieDipendente(id).subscribe({
      next:response =>( response.map(giorn =>{
        this.disRfd.push(giorn);
        let dd:any = this.datePipe.transform( giorn.giornataFeriale.dataGiornataFeriale , "yyyy-MM-dd" );
        this.disferie.push(dd);
      }) )
    })
  }

  public prenotaFerie(){
    const dInizio = this.cambioData(this.formFerie.value.datainizio );
    const dfine = this.cambioData(this.formFerie.value.datafine );
    for(let currentDate= dInizio; currentDate <= dfine; currentDate.setDate(currentDate.getDate() + 1)) {
      let dd:any = this.datePipe.transform(currentDate , "yyyy-MM-dd");
      this.gf.richiediFerie(dd,this.dipendente).subscribe({
        next:response =>{
          alert("ferie Aggiunta in data"+dd);
        }
      })
    }
  }

  private cambioData(data:String){
    const parts = data.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day); 
    return date;
  }



}
