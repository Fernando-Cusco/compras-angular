import { UsuarioService } from './../../views/usuario/service/usuario.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private usuarioServicio: UsuarioService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status == 403 || error.status == 0) {
                    this.usuarioServicio.eliminarToken();
                    this.router.navigate(['/usuario/login']);
                } else {
                    return throwError(error);
                }
            })
        );
    }

     

}