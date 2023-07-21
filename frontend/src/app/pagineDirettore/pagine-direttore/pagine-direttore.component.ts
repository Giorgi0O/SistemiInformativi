import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Authentication/auth.service';
import { funzComuniService } from 'src/app/utils/funzComuni.service';

@Component({
  selector: 'app-pagine-direttore',
  templateUrl: './pagine-direttore.component.html',
  styleUrls: ['./pagine-direttore.component.css']
})
export class PagineDirettoreComponent {

  logoutButton:boolean = false;
  constructor( private rut:Router ,private fun:funzComuniService , private aut:AuthService ){}


  logout(){
    this.logoutButton = true; 
  }
  denied(){
    this.logoutButton = false; 
  }

  confirmLogout(){
    this.fun.signOut();
    this.rut.navigate(["/"]);
    this.logoutButton = false; 
    console.log(window.sessionStorage);
  }

}
