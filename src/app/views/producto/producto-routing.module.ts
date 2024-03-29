import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './views/mostrar-producto/mostrar-producto.component';
import { RegistrarProductoComponent } from './views/registrar-producto/registrar-producto.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { Role } from 'src/app/core/models/role.enum';

const routes: Routes = [
  {
    path: 'registrar',
    component:  RegistrarProductoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_ADMIN, Role.ROLE_USER_WRITE]
    }
  },
  {
    path: 'lista',
    component:  MostrarProductoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [Role.ROLE_ADMIN, Role.ROLE_USER_WRITE, Role.ROLE_USER_READ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
