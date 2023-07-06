import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnisettimanaliComponent } from '../turnisettimanali/turnisettimanali.component';
import { CreaTurniComponent } from '../crea-turni/crea-turni.component';
import { CreaFerieComponent } from '../crea-ferie/crea-ferie.component';
import { ListaDipendentiComponent } from '../lista-dipendenti/lista-dipendenti.component';
import { ModificaDipendenteComponent } from '../modifica-dipendente/modifica-dipendente.component';
import { ModificaFerieComponent } from '../modifica-ferie/modifica-ferie.component';
import { ModificaTurniComponent } from '../modifica-turni/modifica-turni.component';
import { NuovoDipendenteComponent } from '../nuovo-dipendente/nuovo-dipendente.component';
import { PianoFerieComponent } from '../piano-ferie/piano-ferie.component';
import { PagineDirettoreComponent } from './pagine-direttore.component';
import { RuoliComponent } from '../ruoli/ruoli.component';


const routes: Routes = [
  {
    path:"direttore",
    component: PagineDirettoreComponent,
    children:[ {
      path:"turni",
      component:TurnisettimanaliComponent
      },
      {
        path:"creaturni",
        component: CreaTurniComponent
      },
      {
        path:"modificaturno",
        component: ModificaTurniComponent
      },
      {
        path:"dipendenti",
        component: ListaDipendentiComponent
      },
      {
        path:"nuovodipendente",
        component: NuovoDipendenteComponent,
        children:[{
          path:"nuovodipendente/ruoli",
          component:RuoliComponent
        }]
      },
      {
        path:"ferie",
        component: PianoFerieComponent
      },
      {
        path:"creaferie",
        component: CreaFerieComponent
      },
      {
        path:"modificaferie",
        component: ModificaFerieComponent
      },
      {
        path:"dipendenti/modifica",
        component: ModificaDipendenteComponent
      },
      
    ]
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppPagineDirettore { }