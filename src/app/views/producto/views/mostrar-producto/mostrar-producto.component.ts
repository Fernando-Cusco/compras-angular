import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { Producto } from '../../model/producto.model';

@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.css']
})
export class MostrarProductoComponent implements OnInit {

  public productos: Producto[] = [];

  constructor(private productoService: ProductoService) { 
    productoService.productos().subscribe(res => {
      this.productos = res
      console.log(this.productos);
      
    });
  }

  ngOnInit(): void {
  }

}
