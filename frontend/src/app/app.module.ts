import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarButtonComponent } from './pagineDirettore/nav-bar-button-principal/nav-bar-button.component';
import { NotificheComponent } from './pagineDirettore/notifiche/notifiche.component';
import { TurnisettimanaliComponent } from './pagineDirettore/turnisettimanali/turnisettimanali.component';
import { CreaTurniComponent } from './pagineDirettore/crea-turni/crea-turni.component';
import { ModificaTurniComponent } from './pagineDirettore/modifica-turni/modifica-turni.component';
import { ListaDipendentiComponent } from './pagineDirettore/lista-dipendenti/lista-dipendenti.component';
import { NuovoDipendenteComponent } from './pagineDirettore/nuovo-dipendente/nuovo-dipendente.component';
import { PianoFerieComponent } from './pagineDirettore/piano-ferie/piano-ferie.component';
import { CreaFerieComponent } from './pagineDirettore/crea-ferie/crea-ferie.component';
import { ModificaFerieComponent } from './pagineDirettore/modifica-ferie/modifica-ferie.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModificaDipendenteComponent } from './pagineDirettore/modifica-dipendente/modifica-dipendente.component';
import { PagineDirettoreComponent } from './pagineDirettore/pagine-direttore/pagine-direttore.component';
import { LoginComponent } from './login/login.component';
import { AppPagineDirettore } from './pagineDirettore/pagine-direttore/pagine-direttore.module';
import { HomeComponent } from './pagineDipendente/home/home.component';
import { DipendentiService } from './service/dipendenti.service';
import { RuoliComponent } from './pagineDirettore/ruoli/ruoli.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarButtonComponent,
    NotificheComponent,
    TurnisettimanaliComponent,
    CreaTurniComponent,
    ModificaTurniComponent,
    ListaDipendentiComponent,
    NuovoDipendenteComponent,
    PianoFerieComponent,
    CreaFerieComponent,
    ModificaFerieComponent,
    ModificaDipendenteComponent,
    PagineDirettoreComponent,
    LoginComponent,
    HomeComponent,
    RuoliComponent,
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
        component: HomeComponent
      },
      {
        path:"direttore",
        component: PagineDirettoreComponent
      },
    ]),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppPagineDirettore
  ],
  providers: [DipendentiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
