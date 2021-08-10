import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrls: ['./usuario-login.component.css']
})
export class UsuarioLoginComponent implements OnInit {

  public formGroup: FormGroup;
  public hide = true;
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required])
  
  private usuario: Usuario;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formGroup = this.formBuilder.group([this.email, this.password]);
  }

  onSubmit() {
    this.usuario = {
      correo: this.email.value,
      password: this.password.value,
      estado: null,
      fecha_nacimiento: null,
      id: null,
      token: null,
      telefono: null,
      username: null
    }
    this.usuarioService.login(this.usuario).subscribe(response => {
      this.router.navigate(['/producto/lista']);
    })
  }

}
