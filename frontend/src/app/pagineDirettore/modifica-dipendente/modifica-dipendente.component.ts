import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RuoloService } from 'src/app/service/ruolo.service';
import { funzComuniService } from 'src/app/utils/funzComuni.service';

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
  contratto: ContrattoLavorativo = new ContrattoLavorativo("", "");
  id!: number;
  sede!: String;

  public ruoli!:Ruolo[];
 
  constructor( private fun:funzComuniService, private ser:DipendentiService, private rol:RuoloService ){}

  ngOnInit(){
    this.dipendenti = this.fun.getDipendenti();
    this.ruoli = this.fun.getRuoli();
    this.searchForm = new FormGroup({
      nome: new FormControl(null, Validators.required )
    }); 
    this.filterForm = new FormGroup({
      ruolo: new FormControl("nessuno"),
      contratto: new FormControl("nessuno")
    });
    this.modifyForm = new FormGroup({
      nome: new FormControl(),
      cognome: new FormControl(),
      ruolo: new FormControl(),
      telefono: new FormControl(null, [Validators.required,Validators.pattern(/^\d+$/)] ),
      email: new FormControl(null, [Validators.required,Validators.email]),
      tipologia: new FormControl(),
      descrizione: new FormControl()
    }); 
  }
  public filtri(){
    this.bottonActiveFilter = true;
    const ruolo = this.filterForm.value.ruolo;
    const contratto = this.filterForm.value.contratto;
    this.ser.getDipendentiFiltri( ruolo , contratto ).subscribe(
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
    this.resetForm();
  }
  resetForm(){
    this.filterForm.patchValue({
      ruolo:"nessuno",
      contratto:"nessuno"
    });
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
    this.ser.updateDipendente( this.id , nuovo ).subscribe(
      {
        next:()=>{
          alert("Dipendente modificato correttemente");
          this.bottonActiveModify = false;
          window.location.reload();
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
      if( r.id.toString() === this.modifyForm.value.ruolo ){
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

}
