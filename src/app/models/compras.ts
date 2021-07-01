import { DetalleCompras } from "./detalle-compras";

export class Compras {

    id!: number;
    cliente!: null;
    pago!: any[];
    fecha_compras!: Date;
    estado!: string;
    detalles!: DetalleCompras[];

    constructor(){
        this.detalles = [];
    }
}
