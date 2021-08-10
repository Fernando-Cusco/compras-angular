import { Imagen } from './imagen.model';
import { Caracteristica } from './caracteristica.model';
export class Producto {
    id:                   number;
    nombre:               string;
    descripcion:          string;
    estado:               boolean;
    stock:                number;
    promocion:            boolean;
    precio_inicial:       number;
    descuento_porcentaje: number;
    valor_descuento:      number;
    precio_final:         number;
    imagenes:             Imagen[];
    caracteristicas:      Caracteristica[];
}

