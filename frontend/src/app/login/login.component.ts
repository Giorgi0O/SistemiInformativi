import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { funzComuniService } from '../utils/funzComuni.service';
import { AuthService } from '../Authentication/auth.service';
import { DipendentiService } from '../service/dipendenti.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  loginActive:boolean = false;
  loginFail:boolean = false;

  constructor( private dip:DipendentiService, private ruoter:Router,  private fun:funzComuniService , private aut:AuthService ){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required )
    });
  }


  onSubmit(){
    this.loginFail = false;
    this.login();
  }


  login(){
    this.aut.login( this.loginForm.value.username , this.loginForm.value.password ).subscribe({
      next:response =>{
        const token = response.access_token;
        //salvataggio token
        this.fun.saveToken(token);
        this.fun.saveUser(response);
        const roles = this.fun.getRole();
        if( roles[0] === "direttoreCS" ){
          this.ruoter.navigate(['/direttore/turni']);
        }else if( roles[1] === "dipendenteCS"){
          this.ruoter.navigate(['/dipendente']);
        }
      },
      error: error =>{
        this.fail(); 
      }
    });

  }

  fail(){
    this.loginFail = true;
    this.loginForm.reset();
  }
  


}
