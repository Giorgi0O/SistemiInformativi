import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ruolo } from 'src/app/model/Ruolo';
import { RuoloService } from 'src/app/service/ruolo.service';

@Component({
  selector: 'app-ruoli',
  templateUrl: './ruoli.component.html',
  styleUrls: ['./ruoli.component.css']
})
export class RuoliComponent implements OnInit {

  ruoli!:Ruolo[];
  ruoliForm!:FormGroup;
  createForm!:FormGroup;

  buttonCreate:boolean = false;
  buttonModify:boolean = false;
  buttonDelete:boolean = false;


  constructor( private rol:RuoloService ){}

  ngOnInit(){
    this.ruoli = [];
    this.prendiRuoli();
    this.createForm = new FormGroup({
      nuovo: new FormControl(null, [Validators.required] )
    })
    this.ruoliForm = new FormGroup({
      ruoloVecchio: new FormControl(null, Validators.required),
      ruoloNuovo: new FormControl(null, Validators.required),
    });
  }

  public createRuolo(){
    this.buttonCreate = true;
    const ruolo = new Ruolo(this.createForm.value.nuovo);
    this.rol.createRuolo(ruolo).subscribe(
      {
        next:()=>{
          alert("ruolo aggiunto");
          window.location.reload();
          this.buttonCreate = false;
        },
        error:error=>{
          alert("dipendente non aggiunto, riprova");
          this.buttonCreate = false;
        }
      }
    );
  }

  public updateRuolo(){
    this.buttonModify = true;
    const ruoloVecchio = this.trovaRuolo();
    const ruoloNuovo = new Ruolo(this.ruoliForm.value.ruoloNuovo);
    console.log(this.ruoliForm.value.ruoloVecchio);
    this.rol.updateRuolo( ruoloVecchio.id , ruoloNuovo).subscribe(
      {
        next:()=>{
          alert("ruolo modificato");
          window.location.reload();
          this.buttonModify = false;
        },
        error:error=>{
          alert("ruolo non modificato, riprova");
          this.buttonModify = false;
        }
      }
    );
  }

  

  public deleteRuolo(){
    this.buttonDelete = true;
    const ruolo = this.trovaRuolo();
    console.log(ruolo);
    this.rol.deleteRuolo(ruolo.id).subscribe(
      {
        next:()=>{
          alert("ruolo eliminato");
          window.location.reload();

          this.buttonDelete = false;
        },
        error:error=>{
          alert("ruolo non eliminato, riprova");
          this.buttonDelete = false;
        }
      }
    );
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
      if( r.id == this.ruoliForm.value.ruoloVecchio ){
        trovato = r;
      }
    }
    return trovato;
  }

}