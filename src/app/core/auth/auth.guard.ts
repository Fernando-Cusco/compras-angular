import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../views/usuario/service/usuario.service';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private usuarioService: UsuarioService, private router: Router) {
    
    
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.usuarioService.decodeToken();
    if (token != null) {
      const expiracion: Date = new Date(token.exp*1000);
      const today: Date = new Date();
      for (let i = 0; i < token.authorities.length; i ++) {
        if (route.data.roles.includes(token.authorities[i])) {
          return (expiracion >= today)? true: false;
        } else {
          this.router.navigate(['/forebbiden']);
          return false;
        }
      }
    }
    this.router.navigate(['/usuario']).then(() => {
      // window.location.reload();
    })
    return false;
  }
  
}
