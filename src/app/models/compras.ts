import { Cliente } from "./cliente";
import { DetalleCompras } from "./detalle-compras";

export class Compras {

    id!: number;
    cliente!: Cliente;
    pago!: any[];
    fecha_compras!: Date;
    direccion_envio!: string;
    tipo_pago!: string;
    num_tarjeta!: string;
    expiration!: string;
    cvv!: string;
    tipo_tarjeta!: string;
    estado!: string;
    detalles!: DetalleCompras[];
    total: number = 0.0;
    img!: string;
    constructor(){
        this.detalles = [];
    }
}
