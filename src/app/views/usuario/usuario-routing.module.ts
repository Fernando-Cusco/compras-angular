import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioRegistroComponent } from './views/usuario-registro/usuario-registro.component';
import { UsuarioLoginComponent } from './views/usuario-login/usuario-login.component';

const routes: Routes = [
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
