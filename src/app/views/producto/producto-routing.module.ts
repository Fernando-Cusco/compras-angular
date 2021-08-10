import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarProductoComponent } from './views/mostrar-producto/mostrar-producto.component';
import { RegistrarProductoComponent } from './views/registrar-producto/registrar-producto.component';
import { AuthGuard } from '../../core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'registrar',
    component:  RegistrarProductoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lista',
    component:  MostrarProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
