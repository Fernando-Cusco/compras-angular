import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UsuarioService } from './views/usuario/service/usuario.service';
import { Token } from './core/models/token.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Compras';
  constructor(usuarioService: UsuarioService, router: Router){
    console.log('aquiiii');
    
    let hide: boolean = false;
    const token: Token = usuarioService.decodeToken();
    if (token != null) {
      const expiracion: Date = new Date(token.exp*1000);
      const today: Date = new Date();
      hide = (expiracion >= today)? true: false;
      if (!hide) {
        router.navigate(['/usuario/login']);
      }
    } else {
      hide = false;
      router.navigate(['/usuario/login']);
    }
  }

}
