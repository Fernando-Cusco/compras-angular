import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../views/usuario/service/usuario.service';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private token: Token;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.token = usuarioService.decodeToken();
    
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.token != null) {
      const expiracion: Date = new Date(this.token.exp*1000);
      const today: Date = new Date();
      return (expiracion >= today)? true: false;
    }
    this.router.navigate(['/usuario']);
    return false;
  }
  
}
