import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';

@Component({
  selector: 'app-modifica-dipendente',
  templateUrl: './modifica-dipendente.component.html',
  styleUrls: ['./modifica-dipendente.component.css']
})
export class ModificaDipendenteComponent {
  
  searchForm!: FormGroup;
  filterForm!: FormGroup;
  modifyForm!: FormGroup;


  bottonActiveFilter:boolean = false;
  bottonActiveSearch:boolean = false;
  bottonActiveModify: boolean = false;


  dipendenti!: Dipendente[];
  ruolo!:Ruolo;
  telefono:number=0;
  email:String="";
  nome: String ="";
  cognome: String = "";
  contratto!: ContrattoLavorativo;
  id!: number;
  sede!: String;
 
  constructor( private ser:DipendentiService ){}

  ngOnInit(){
    this.dipendenti = [];
    this.getDipendenti();
    this.searchForm = new FormGroup({
      nome: new FormControl(null, Validators.required )
    }); 
    this.filterForm = new FormGroup({
      ruolo: new FormControl(),
      contratto: new FormControl()
    });
    this.modifyForm = new FormGroup({
      nome: new FormControl(this.nome),
      cognome: new FormControl(this.cognome),
      ruolo: new FormControl(),
      telefono: new FormControl(this.telefono),
      email: new FormControl(this.email),
      tipologia: new FormControl(),
      descrizione: new FormControl()
    })
  }
  
  public getDipendenti():void{
    this.ser.getDipendenti().subscribe(
      {
        next:response=>( this.dipendenti = response ),
        error:error=> ( console.log(error.message) )
      }
    );
  }

  public filtri(){
    this.bottonActiveFilter = true;
    if( this.filterForm.value.ruolo !== null && this.filterForm.value.contratto !== null ){
      this.ser.getDipendentiFiltri(this.filterForm.value.ruolo , this.filterForm.value.contratto).subscribe(
        {
          next:response=>{ 
            this.dipendenti = response; 
            this.bottonActiveFilter = false;
          },
          error:error=>{
            console.log(error.message);
            this.bottonActiveFilter = false;
          }
        }
      );
    }else if( this.filterForm.value.ruolo !== null ){
      const contratto = " ";
      this.ser.getDipendentiFiltri(this.filterForm.value.ruolo , contratto ).subscribe(
        {
          next:response=>{ 
            this.dipendenti = response; 
            this.bottonActiveFilter = false;
          },
          error:error=>{
            console.log(error.message);
            this.bottonActiveFilter = false;
          }
        }
      );
    }else if( this.filterForm.value.contratto !== null ){
      const ruolo = " ";
      this.ser.getDipendentiFiltri(ruolo , this.filterForm.value.contratto ).subscribe(
        {
          next:response=>{ 
            this.dipendenti = response; 
            this.bottonActiveFilter = false;
          },
          error:error=>{
            console.log(error.message);
            this.bottonActiveFilter = false;
          }
        }
      );
    }
  }
  
  public cerca(){
    this.bottonActiveSearch = true;
    this.ser.getDipendentiNome(this.searchForm.value.nome).subscribe(
      {
        next:response=>{ 
          this.dipendenti = response; 
          this.bottonActiveSearch = false;
        },
        error:error=>{
          console.log(error.message);
          this.bottonActiveSearch = false;
        }
      }
    );
  }

  public modifica(){

    this.bottonActiveModify = true;
    
    const contratto = new ContrattoLavorativo(this.modifyForm.value.tipologia, this.modifyForm.value.descrizione);
    const ruolo = new Ruolo( this.modifyForm.value.nome );
    const nuovo = new Dipendente(this.modifyForm.value.nome,this.modifyForm.value.cognome, ruolo ,
      this.modifyForm.value.telefono, this.sede, this.modifyForm.value.email , contratto );
    
    this.ser.updateDipendente( this.id , nuovo ).subscribe(
      {
        next:response=>{ 
          if ( response instanceof Dipendente )
            alert("Dipendente modificato correttemente")
          else
            alert("Qualcosa è andato storto, riprova")
          this.bottonActiveModify = false;
        }
      }
    );

  }

  public CambiaIteratore(dip:Dipendente){
    this.nome = dip.nome;
    this.cognome = dip.cognome;
    this.ruolo = dip.ruolo;
    this.telefono = dip.telefono;
    this.sede = dip.sede;
    this.email = dip.email;
    this.contratto = dip.contrattoLavorativo;
    this.id = dip.id;
  }

}
