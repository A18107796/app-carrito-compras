import { GenericEntity } from "./generic-entity";

export class Producto implements GenericEntity{

    id!: number;
    nombres!: string;
    foto!: string | null;
    descripcion!: string;
    precio!: number;
    stock!: number;
    ofertDay!: boolean;

}
