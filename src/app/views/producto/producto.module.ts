import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { MostrarProductoComponent } from './views/mostrar-producto/mostrar-producto.component';
import { CoreComponentsModule } from '../../core/components/core-components.module';
import { RegistrarProductoComponent } from './views/registrar-producto/registrar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [RegistrarProductoComponent, MostrarProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    CoreComponentsModule,
    HttpClientModule,
    MatCardModule,
    CarouselModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class ProductoModule { }
