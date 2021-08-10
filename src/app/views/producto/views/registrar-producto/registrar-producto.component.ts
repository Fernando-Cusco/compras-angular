import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Caracteristica } from '../../model/caracteristica.model';
import {COMMA, E, ENTER, L} from '@angular/cdk/keycodes';
import { Producto } from '../../model/producto.model';
import { Observable } from 'rxjs';
import { ImagenService } from '../../service/imagen.service';
import { Imagen } from '../../model/imagen.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-registrar-producto',
  templateUrl: './registrar-producto.component.html',
  styleUrls: ['./registrar-producto.component.css']
})
export class RegistrarProductoComponent implements OnInit {

  public formGroup: FormGroup;

  public caracteristicas: Caracteristica[] = [];
  private imagenes: Imagen[] = [];
  public producto: Producto = new Producto();


  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  
  public nombre = new FormControl('', [Validators.required]);
  public precio_inicial = new FormControl(0.0, [Validators.required]);
  public porcentaje_descuento = new FormControl(0.0, [Validators.required]);
  public valor_descuento = new FormControl({value: 0.0, disabled: true});
  public precio_final = new FormControl({value: 0.0, disabled: true});
  public stock = new FormControl(0.0, [Validators.required]);
  public descripcion = new FormControl('')


  public selectedFiles: FileList;
  public progress = [];
  public messaje = '';
  public filesInfos: Observable<any>;

  public imageFile: File[] = [];
  public nameFile: String[] = [];
  public selectedValue: string;

  @ViewChild('myInput') files: ElementRef;


  constructor(private formBuilder: FormBuilder, private imagenService: ImagenService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formGroup = this.formBuilder.group([this.nombre, this.precio_final, this.precio_inicial,this.valor_descuento,this.porcentaje_descuento, this.stock, this.descripcion]);
  }

  onSubmit(form: NgForm) {
    this.producto.nombre = this.nombre.value;
    this.producto.caracteristicas = this.caracteristicas;
    this.producto.precio_inicial = this.precio_final.value;
    this.producto.precio_final = this.precio_final.value;
    this.producto.descuento_porcentaje = this.porcentaje_descuento.value;
    this.producto.valor_descuento = this.valor_descuento.value;
    this.producto.promocion = false;
    this.producto.estado = true;
    let c = 0;
    for (let i = 0; i < this.imageFile.length; i++)  {      
      this.imagenService.uploadImage(this.imageFile[i]).subscribe(res => {
        if (res != null) {
          const img: Imagen = {path: res.path};
          this.imagenes.push(img);
          this.producto.imagenes = this.imagenes;
          c += 1;
          if (this.imageFile.length == c) {
            console.log("termino");
            this.productoService.registrarProducto(this.producto).subscribe(resp => {
              console.log(resp);
              this.cancelar(form);
            });
          } 
        }
      });
    }
  }

  cancelar(form: NgForm) {
    form.resetForm(form.value);
    this.nombre.setValue('');
    this.caracteristicas = [];
    this.imagenes = [];
    this.porcentaje_descuento.setValue(0.0);
    this.precio_final.setValue(0.0);
    this.precio_inicial.setValue(0.0);
    this.valor_descuento.setValue(0.0);
    this.files.nativeElement.value = '';
    this.descripcion.setValue('');
    this.stock.setValue(0);
    this.imageFile = [];
  }

  seleccionarImagenes(event) {  
    for (let i = 0; i < event.target.files.length; i++) {
      console.log(event.target.files.length);
      
      const selectFile = event.target.files[i];
      this.imageFile.push(selectFile);
      this.nameFile.push(selectFile.name);
    }
    this.files.nativeElement.value = '';
  }

  eliminarImage(index) {
    this.imageFile.splice(index, 1);
    this.nameFile.splice(index, 1);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.caracteristicas.push({nombre: value});
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(c: Caracteristica): void {
    const index = this.caracteristicas.indexOf(c);

    if (index >= 0) {
      this.caracteristicas.splice(index, 1);
    }
  }

  calcularTotal() {
    let precio = parseFloat(this.precio_inicial.value);
    let porcentajeDescuento = parseFloat(this.porcentaje_descuento.value);
    let descuento = (precio * porcentajeDescuento) / 100;
    this.valor_descuento.setValue(descuento.toFixed(2));
    let precioFinal = precio - descuento;
    this.precio_final.setValue(precioFinal.toFixed(2));
  }

}
