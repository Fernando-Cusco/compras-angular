import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../views/usuario/service/usuario.service';
import { Token } from '../models/token.model';

@Directive({
  selector: '[appRoles]'
})
export class RolesDirective implements OnInit, OnDestroy{

  @Input("appRoles") public appRoles: Array<string>;

  constructor(private usuarioService: UsuarioService) { }

  ngOnDestroy(): void {
    
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    const token: Token = this.usuarioService.decodeToken();
    const roles = token.authorities;
    console.log(roles);
    console.log(this.appRoles);
  }

}
