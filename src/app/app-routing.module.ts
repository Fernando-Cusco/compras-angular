import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadService } from './core/service/preload.service';
import { AuthGuard } from './core/auth/auth.guard';
import { Error403Component } from './core/components/error403/error403.component';

const routes: Routes = [
  {
    path: 'usuario',
    data: {
      preload: true
    },
    loadChildren: () => import('./views/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'producto',
    data: {
      preload: false
    },
    loadChildren: () => import('./views/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full'
  },
  {
    path: 'forebbiden',
    component: Error403Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    preloadingStrategy: PreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
