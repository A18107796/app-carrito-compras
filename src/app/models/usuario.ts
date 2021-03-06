import { Cliente } from "./cliente";
import { Empleado } from "./empleado";

export class Usuario {
    id!: number;
    usuario!: string;
    password!: string;
    enabled!: boolean;
    roles!: string[];
    empleado: Empleado = new Empleado();
    cliente: Cliente = new Cliente();


}
