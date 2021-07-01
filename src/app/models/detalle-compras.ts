import { Producto } from "./producto";

export class DetalleCompras {
    id!: number;
    producto!: Producto;
    cantidad!: number;
    subtotal!: number;
}
