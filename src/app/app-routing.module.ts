import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadService } from './core/service/preload.service';
import { AuthGuard } from './core/auth/auth.guard';

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
    loadChildren: () => import('./views/producto/producto.module').then(m => m.ProductoModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full'
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
