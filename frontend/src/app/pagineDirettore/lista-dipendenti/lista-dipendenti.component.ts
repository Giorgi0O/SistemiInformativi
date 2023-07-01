import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Dipendente } from 'src/app/model/Dipendente';
import { DipendentiService } from 'src/app/service/dipendenti.service';

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


  public dipendenti!: Dipendente[];
  public ruolo:String="";
  public telefono:number=0;
  public email:String="";

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
    console.log(this.searchForm);
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

  public CambiaIteratore(dip:Dipendente){
    this.ruolo = dip.ruolo.nome;
    this.telefono = dip.telefono;
    this.email = dip.email;
  }

}
