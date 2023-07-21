import {Component, OnInit} from '@angular/core';
import {DipendentiService} from "../../service/dipendenti.service";
import {Observable} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {GiornataFerieService} from "../../service/giornata-ferie.service";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dis: number = 0;

  constructor(private ser: DipendentiService) {}

  ngOnInit() {
    this.trovaDisponibilita();
  }

  public disponibilita(email: string): Observable<number> {
    return this.ser.disponibilita(email);
  }

  public trovaDisponibilita(){
    this.disponibilita("email").subscribe(
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
