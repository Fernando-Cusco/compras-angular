import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../service/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  private usuario: Usuario;
  public formGroup :FormGroup;

  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const correo = this.usuarioService.decodeToken().sub;
    this.usuarioService.perfil(correo).subscribe(res => {
      this.usuario = res['entity'];
      const fecha = this.usuario.fecha_nacimiento.split("-");
      this.fechaNacimientoField.setValue(fecha[2]+"-"+fecha[1]+"-"+fecha[0]);
      this.correoField.setValue(this.usuario.correo);
      this.usernameField.setValue(this.usuario.username);
      this.telefonoField.setValue(this.usuario.telefono);
    });
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formGroup = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', [Validators.required]],
      username: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  subtmit(){
    const fecha = new Date(this.fechaNacimientoField.value);
    const dia = fecha.getDate() + 2;
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    
    this.usuario.telefono = this.telefonoField.value;
    this.usuario.fecha_nacimiento = dia+"-"+mes+"-"+anio;
    this.usuarioService.actualizarPerfil(this.usuario).subscribe(response => {
      console.log('Actualizando');
      
      console.log(response);
    });
    
  }

  get correoField() {
    return this.formGroup.get('correo');
  }

  get fechaNacimientoField() {
    return this.formGroup.get('fechaNacimiento');
  }

  get usernameField() {
    return this.formGroup.get('username');
  }

  get telefonoField() {
    return this.formGroup.get('telefono');
  }

}
