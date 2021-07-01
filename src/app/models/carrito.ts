import { Cliente } from "./cliente";
import { Producto } from "./producto";

export class Carrito {

    id!: number;
    fecha_update!: Date;
    productos!: Map<Number, { producto: Producto, cantidad: number  }>;
    cliente!: Cliente | string;

    constructor() {
        this.productos = new Map();
    }

}
