import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { DipendentiService } from 'src/app/service/dipendenti.service';

@Component({
  selector: 'app-nuovo-dipendente',
  templateUrl: './nuovo-dipendente.component.html',
  styleUrls: ['./nuovo-dipendente.component.css']
})
export class NuovoDipendenteComponent implements OnInit  {

  createForm!:FormGroup;
  sede:String = "cs";

  constructor( private ser:DipendentiService ){}

  ngOnInit(){
    this.prediRuoli();
    this.createForm = new FormGroup({
      nome: new FormControl(),
      congome: new FormControl(),
      ruolo: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      tipContratto: new FormControl(),
      descrizionContratto: new FormControl()
    });
  }

  public crea():void{

    /*const contratto = new ContrattoLavorativo()
    const dipendente = new Dipendente(this.createForm.value.nome, this.createForm.value.cognome , ruolo, this.createForm.value.number, this.sede , this.createForm.value.email, contratto )
    this.ser.createDipendente(dipendente).subscribe(
      {
        next:response=>{
          if( response instanceof Dipendente )
            alert("dipendente aggiunto");
          else
            alert("dipendente non aggiunto riprova")
        }
      }
    );
    */
  }

  public prediRuoli():void{

  }
}
