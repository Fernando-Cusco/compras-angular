import { Role } from 'src/app/core/models/role.enum';
import { AuthGuard } from './../../core/auth/auth.guard';
import { UsuarioPerfilComponent } from './views/usuario-perfil/usuario-perfil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { UsuarioLoginComponent } from './views/usuario-login/usuario-login.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: UsuarioPerfilComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_ADMIN, Role.ROLE_USER_WRITE, Role.ROLE_USER_READ]
    }
  },
  {
    path: 'registro',
    component: UsuarioRegistroComponent
  },
  {
    path: 'login',
    component: UsuarioLoginComponent
  },
  {
    path: '',
    component: UsuarioLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
