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
  public hide: boolean = false;
  private token: Token;

  constructor(private usuarioService: UsuarioService){
    if (this.token != null) {
      this.token = usuarioService.decodeToken();
      const expiracion: Date = new Date(this.token.exp*1000);
      const today: Date = new Date();
      this.hide = (expiracion >= today)? true: false;
    }
    this.hide = false;
  }

}
