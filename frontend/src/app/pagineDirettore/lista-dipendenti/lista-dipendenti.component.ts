import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ContrattoLavorativo } from 'src/app/model/ContrattoLavorativo';
import { Dipendente } from 'src/app/model/Dipendente';
import { Ruolo } from 'src/app/model/Ruolo';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { RuoloService } from 'src/app/service/ruolo.service';
import { funzComuniService } from 'src/app/utils/funzComuni.service';

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


  dipendenti: Dipendente[] = [];
  dipendente!:Dipendente;
  attivo:boolean= false;
  ruolo:String="";
  telefono:number=0;
  email:String="";
  contratto!:ContrattoLavorativo;
  id!: number;
  bottonActiveRemove: boolean=false;
  ruoli!:Ruolo[];

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
  resetForm(){
    this.filterForm.patchValue({
      ruolo:"nessuno",
      contratto:"nessuno"
    });
  }


}
