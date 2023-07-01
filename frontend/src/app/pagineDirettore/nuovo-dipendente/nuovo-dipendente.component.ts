import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RuoloService } from 'src/app/service/ruolo.service';

@Component({
  selector: 'app-nuovo-dipendente',
  templateUrl: './nuovo-dipendente.component.html',
  styleUrls: ['./nuovo-dipendente.component.css']
})
export class NuovoDipendenteComponent implements OnInit  {

  createForm!:FormGroup;
  ruoli!:Ruolo[];
  sede:String = "cs";

  constructor( private ser:DipendentiService, private rol:RuoloService ){}

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

    const ruolo = this.trovaRuolo();

    const contratto = new ContrattoLavorativo(this.createForm.value.tipContratto, this.createForm.value.descrizionContratto );
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
  }

  private trovaRuolo():Ruolo{
    let trovato!:Ruolo;
    for( const r of this.ruoli ){
      if( r.nome === this.createForm.value.ruolo ){
        trovato = r;
      }
    }
    return trovato;
  }

  public prediRuoli():void{
    this.rol.listaRuoloRead().subscribe(
      {
        next:response=>( this.ruoli = response ),
        error:error=> ( console.log(error.message) )
      }
    );
  }

}
