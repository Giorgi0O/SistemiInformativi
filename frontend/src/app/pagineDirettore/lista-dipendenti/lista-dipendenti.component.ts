import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RuoloService } from 'src/app/service/ruolo.service';

@Component({
  selector: 'app-lista-dipendenti',
  templateUrl: './lista-dipendenti.component.html',
  styleUrls: ['./lista-dipendenti.component.css']
})
export class ListaDipendentiComponent implements OnInit{

  searchForm!: FormGroup;
  filterForm!: FormGroup;
  bottonActiveFilter:boolean = false;
  bottonActiveSearch:boolean = false;


  dipendenti!: Dipendente[];
  dipendente!:Dipendente;
  attivo:boolean= false;
  ruolo:String="";
  telefono:number=0;
  email:String="";
  contratto!:ContrattoLavorativo;
  id!: number;
  bottonActiveRemove: boolean=false;
  ruoli!:Ruolo[];

  constructor( private ser:DipendentiService, private rol:RuoloService ){}

  ngOnInit(){
    this.dipendenti = [];
    this.getDipendenti();
    this.prendiRuoli();
    this.searchForm = new FormGroup({
      nome: new FormControl(null, Validators.required )
    }); 
    this.filterForm = new FormGroup({
      ruolo: new FormControl(),
      contratto: new FormControl()
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
    const ruolo = this.trovaRuolo();
    if( this.filterForm.value.ruolo !== null && this.filterForm.value.contratto !== null ){
      this.ser.getDipendentiFiltri( ruolo.nome , this.filterForm.value.contratto ).subscribe(
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
      this.ser.getDipendentiFiltri( ruolo.nome , "nessuno" ).subscribe(
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
      this.ser.getDipendentiFiltri( "nessuno" , this.filterForm.value.contratto ).subscribe(
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
    }else {
      this.ser.getDipendentiFiltri( "nessuno" , "nessuno" ).subscribe(
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
    this.filterForm.reset();
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

  public removeDipendente(){
    this.bottonActiveRemove = true;
    this.ser.deleteDipendente(this.id).subscribe(
      {
        next:response=>{
          console.log(this.dipendenti);
          this.bottonActiveRemove = false;
        },
        error:error=>{
          this.bottonActiveRemove = false;
        },
      }
    );
    this.dipendenti.splice( this.dipendenti.indexOf(this.dipendente) ,1);
    this.ruolo = "";
    this.email = "";
    this.telefono = 0;
  }

  public CambiaIteratore(dip:Dipendente){
    this.dipendente = dip;
    this.ruolo = dip.ruolo.nome;
    this.telefono = dip.telefono;
    this.email = dip.email;
    this.contratto = dip.contrattoLavorativo;
    this.id = dip.id;
    this.attivo = true;
  }

  public prendiRuoli():void{
    this.rol.listaRuoloRead().subscribe(
      {
        next:response=>( this.ruoli = response ),
        error:error=> ( alert(error.message) )
      }
    );
  }

  private trovaRuolo():Ruolo{
    let trovato:Ruolo = this.ruoli[0];
    for( const r of this.ruoli ){
      if( r.id === this.filterForm.value.ruolo ){
        trovato = r;
      }
    }
    return trovato;
  }


}
