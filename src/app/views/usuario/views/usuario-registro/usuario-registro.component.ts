import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.component.html',
  styleUrls: ['./usuario-registro.component.css']
})
export class UsuarioRegistroComponent implements OnInit {

  public formGroup: FormGroup;
  public hide: boolean = true;
  public correo = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public username = new FormControl('', [Validators.required]);
  public fecha = new FormControl('', [Validators.required]);
  public telefono = new FormControl('', [Validators.required]);



  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formGroup = this.formBuilder.group([this.correo, this.password, this.username, this.fecha, this.telefono]);

  }

  onSubmit() {

  }

}
