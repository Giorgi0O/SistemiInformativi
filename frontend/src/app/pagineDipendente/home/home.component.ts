import {Component, OnInit} from '@angular/core';
import {DipendentiService} from "../../service/dipendenti.service";
import {Observable} from "rxjs";
import { funzComuniService } from 'src/app/utils/funzComuni.service';
import { Dipendente } from 'src/app/model/Dipendente';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dipendente!:Dipendente;
  dis: number = 0;

  constructor(private ser: DipendentiService, private fun:funzComuniService ) {}

  ngOnInit() {
    this.trovaDipendente();
  }



  trovaDipendente(){
    const user = this.fun.getUsername();
    this.ser.getDipendenteEmail(user).subscribe({
      next: response =>{ this.dipendente = response; this.trovaDisponibilita(response.email) }
    })
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

}
