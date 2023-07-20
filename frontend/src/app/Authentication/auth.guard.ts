import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { funzComuniService } from "../utils/funzComuni.service";


export const authGuard: CanActivateFn = (route, state) => {
  const fun = inject(funzComuniService);
  const ro = inject(Router);

  const path = route.url[0].path;
  let role = (path === "dipendente")? "dipendenteCS" : (path === "direttore") ? "direttoreCS" : "";
  if( !fun.isLogged(role) ){
    ro.navigate(["/login"]);
    return false;
  }
  return true;
};

export const authGuardDirettore: CanActivateFn = (route, state) => {
  const fun = inject(funzComuniService);
  const ro = inject(Router);
  const role = "direttoreCS"
  if( !fun.isLogged(role) ){
    ro.navigate(["/login"]);
    return false;
  }
  return true;
};

export const authGuardDipendente: CanActivateFn = (route, state) => {
  const fun = inject(funzComuniService);
  const ro = inject(Router);
  const role = "dipendenteCS"
  if( !fun.isLogged(role) ){
    ro.navigate(["/login"]);
    return false;
  }
  return true;
};
