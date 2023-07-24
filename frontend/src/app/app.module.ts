import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarButtonComponent } from './pagineDirettore/nav-bar-button-principal/nav-bar-button.component';
import { TurnisettimanaliComponent } from './pagineDirettore/turnisettimanali/turnisettimanali.component';
import { CreaTurniComponent } from './pagineDirettore/crea-turni/crea-turni.component';
import { ModificaTurniComponent } from './pagineDirettore/modifica-turni/modifica-turni.component';
import { ListaDipendentiComponent } from './pagineDirettore/lista-dipendenti/lista-dipendenti.component';
import { NuovoDipendenteComponent } from './pagineDirettore/nuovo-dipendente/nuovo-dipendente.component';
import { PianoFerieComponent } from './pagineDirettore/piano-ferie/piano-ferie.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModificaDipendenteComponent } from './pagineDirettore/modifica-dipendente/modifica-dipendente.component';
import { PagineDirettoreComponent } from './pagineDirettore/pagine-direttore/pagine-direttore.component';
import { LoginComponent } from './login/login.component';
import { AppPagineDirettore } from './pagineDirettore/pagine-direttore/pagine-direttore.module';
import { HomeComponent } from './pagineDipendente/home/home.component';
import { RichiediFerieComponent } from './pagineDipendente/richiedi-ferie/richiedi-ferie.component';
import { authInterceptorProviders } from './Authentication/auth.interceptor';
import { DatePipe } from '@angular/common';
import { authGuard, authGuardDipendente } from './Authentication/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavBarButtonComponent,
    TurnisettimanaliComponent,
    CreaTurniComponent,
    ModificaTurniComponent,
    ListaDipendentiComponent,
    NuovoDipendenteComponent,
    PianoFerieComponent,
    ModificaDipendenteComponent,
    PagineDirettoreComponent,
    LoginComponent,
    HomeComponent,
    RichiediFerieComponent,
  ],
  imports: [
    RouterModule.forRoot([
      {
        path:"",
        redirectTo:"login",
        pathMatch: 'full'
      },
      {
        path:"login",
        component: LoginComponent
      },
      {
        path:"dipendente",
        canActivate: [authGuard],
        component: HomeComponent,
      },
      {
        path:"dipendente/ferie",
        canActivate: [authGuardDipendente],
        component: RichiediFerieComponent,
      },
      {
        path:"direttore",
        canActivate: [authGuard],
        component: PagineDirettoreComponent
      },
    ]),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppPagineDirettore
  ],
  providers: [
    DatePipe,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
