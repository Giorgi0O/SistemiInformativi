import { Component } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RuoloService } from 'src/app/service/ruolo.service';

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
  email:String=" ";
  nome: String =" ";
  cognome: String = "";
  contratto: ContrattoLavorativo = new ContrattoLavorativo(" ", " ");
  id!: number;
  sede!: String;

  public ruoli!:Ruolo[];
 
  constructor( private ser:DipendentiService, private rol:RuoloService ){}

  ngOnInit(){
    this.dipendenti = [];
    this.getDipendenti();
    this.ruoli = [];
    this.prendiRuoli();
    this.searchForm = new FormGroup({
      nome: new FormControl(null, Validators.required )
    }); 
    this.filterForm = new FormGroup({
      ruolo: new FormControl(),
      contratto: new FormControl()
    });
    this.modifyForm = new FormGroup({
      nome: new FormControl(),
      cognome: new FormControl(),
      ruolo: new FormControl(),
      telefono: new FormControl(null),
      email: new FormControl(),
      tipologia: new FormControl(),
      descrizione: new FormControl()
    });
    
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
    let tipologia = this.contratto.tipologia;
    if( this.modifyForm.value.tipologia !== this.contratto.tipologia && this.modifyForm.value.tipologia !== null){ tipologia = this.modifyForm.value.tipologia  }
    
    const contratto = new ContrattoLavorativo( tipologia , this.modifyForm.value.descrizione);
    
    const ruolo = this.trovaRuolo();
    const nuovo = new Dipendente(this.modifyForm.value.nome,this.modifyForm.value.cognome, ruolo ,
      this.modifyForm.value.telefono, this.sede, this.modifyForm.value.email , contratto );
    console.log(nuovo);
    this.ser.updateDipendente( this.id , nuovo ).subscribe(
      {
        next:()=>{
          alert("Dipendente modificato correttemente");
          this.bottonActiveModify = false;
        },
        error:()=>{
          alert("Dipendente non modificato riprova");
          this.bottonActiveModify = false;
        }
      }
    );
  }

  private trovaRuolo():Ruolo{
    let trovato = this.ruolo;
    for( const r of this.ruoli ){
      if( r.id == this.modifyForm.value.ruolo ){
        trovato = r;
      }
    }
    return trovato;
  }

  public CambiaIteratore(dip:Dipendente){
    this.nome = dip.nome;
    this.cognome = dip.cognome;
    this.ruolo = dip.ruolo;
    this.telefono = dip.telefono;
    this.sede = dip.sede;
    this.email = dip.email;
    this.contratto = dip.contrattoLavorativo;
    console.log(this.contratto);
    this.id = dip.id;
    this.modifyForm = new FormGroup({
      nome: new FormControl(this.nome ),
      cognome: new FormControl(this.cognome),
      ruolo: new FormControl(),
      telefono: new FormControl(this.telefono),
      email: new FormControl(this.email),
      tipologia: new FormControl(),
      descrizione: new FormControl(this.contratto.descrizione)
    })
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
