import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public ruoli!: Ruolo[];
  sede:String = "cs";

  buttonCreaActive:boolean = false;

  constructor( private rol:RuoloService,private ser:DipendentiService ){}

  ngOnInit(){
    this.ruoli = [];
    this.prendiRuoli();
    this.createForm = new FormGroup({
      nome: new FormControl(null, Validators.required),
      cognome: new FormControl(null, Validators.required),
      ruolo: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      tipologia: new FormControl(null, Validators.required),
      descrizione: new FormControl()
    });

  }

  public crea():void{
    this.buttonCreaActive = true;

    const ruolo = this.trovaRuolo();
    const contratto = new ContrattoLavorativo(this.createForm.value.tipologia, this.createForm.value.descrizione );
    
    
    const dipendente = new Dipendente(this.createForm.value.nome, this.createForm.value.cognome , ruolo , this.createForm.value.telefono, this.sede , this.createForm.value.email, contratto )
    
    
    if( this.createForm.valid ){
      this.ser.createDipendente(dipendente).subscribe(
        {
          next:()=>{
            alert("dipendente aggiunto");
            this.buttonCreaActive = false;
            this.createForm.reset();
          },
          error:error=>{
            alert("dipendente non aggiunto, riprova");
            this.buttonCreaActive = false;
          }
        }
      );
    }
    this.buttonCreaActive = false;
  }
  private trovaRuolo():Ruolo{
    let trovato:Ruolo = this.ruoli[0];
    for( const r of this.ruoli ){
      if( r.id === this.createForm.value.ruolo ){
        trovato = r;
      }
    }
    return trovato;
  }
  
  public prendiRuoli():void{
    this.rol.listaRuoloRead().subscribe(
      {
        next:response=>( this.ruoli = response ),
        error:error=> ( alert(error.message) )
      }
    );
  }




}
