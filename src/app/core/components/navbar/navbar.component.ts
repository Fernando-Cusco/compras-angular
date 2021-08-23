import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../views/usuario/service/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.usuarioService.eliminarToken();
  }

}
