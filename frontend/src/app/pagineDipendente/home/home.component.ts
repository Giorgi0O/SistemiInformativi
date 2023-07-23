import {Component, OnInit} from '@angular/core';
import {DipendentiService} from "../../service/dipendenti.service";
import {Observable} from "rxjs";
import { funzComuniService } from 'src/app/utils/funzComuni.service';
import { Dipendente } from 'src/app/model/Dipendente';
import { TurnoLavorativo } from 'src/app/model/TurnoLavorativo';
import { R_TD } from 'src/app/model/R_TD';
import { DatePipe } from '@angular/common';
import { RtdService } from 'src/app/service/rtd.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dipendente!:Dipendente;
  dis: number = 0;
  turni!:TurnoLavorativo[];
  rtdSettimanli:R_TD[]= [];

  date:Date= new Date();
  dateSettimana:any[] = [];
  daysOfWeek:String[] = ['Domenica','Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

  reqlogout:Boolean = false;

  constructor( private rut:Router, private rtd:RtdService, private ser: DipendentiService, private fun:funzComuniService , private datePipe:DatePipe ) {}

  ngOnInit() {
    this.trovaDipendente();
    this.turni = this.fun.getTurni();
  }

  public prelevaRtd(){
    const dataFine: Date = new Date();
    dataFine.setDate(this.date.getDate() + 6);

    const cd = new Date();
    cd.setDate(this.date.getDate())

    for (let currentDate= cd; currentDate <= dataFine; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattata = this.datePipe.transform(currentDate , "yyyy-MM-dd");
      this.dateSettimana.push(formattata);
      this.rtd.filtriRTD( formattata , this.dipendente.id).subscribe({
        next:response =>{ response.map(turno => {
            this.rtdSettimanli.push(turno);
        })},
        error:error =>{ console.log("ops, problemi di rete"); }
      });
    }
  }

  trovaDipendente(){
    const user = this.fun.getUsername();
    this.ser.getDipendenteEmail(user).subscribe({
      next: response =>{ 
        this.dipendente = response;
        this.trovaDisponibilita(response.email);
        this.prelevaRtd();
        this.trovaNome();
      }
    })
  }

  trovaNome(){
    if( this.dipendente != null ){
      return this.dipendente.nome;
    }
    return "";
  }

  public trovaDisponibilita(email:String){
    this.ser.disponibilita( email ).subscribe(
      {
        next: response => {
          this.dis = response;
        },
        error: error => {
          console.log(error.message);
        }
      }
    );
  }

  thisTurno( d:any, id:number ):boolean{
    for( let rtd of this.rtdSettimanli ){
      if( rtd.turnoLavorativoDate === d && rtd.turnoLavorativo.id == id ) return true;
    }
    return false;
  }

  public requestlogout(){
    this.reqlogout = true;
  }

  denied(){
    this.reqlogout = false; 
  }

  confirmLogout(){
    this.fun.signOut();
    this.rut.navigate(["/"]);
    this.reqlogout = false; 
    console.log(window.sessionStorage);
  }

}
