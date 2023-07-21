import { HTTP_INTERCEPTORS, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError } from "rxjs";
import { funzComuniService } from "../utils/funzComuni.service";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor( private fun:funzComuniService, private aut:AuthService ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.fun.getToken();
        if (req.method === 'OPTIONS' && token) {
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token)});
        }
        if( token != null ){
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer '+token) });
        }
        return next.handle(authReq);
    }
    
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];