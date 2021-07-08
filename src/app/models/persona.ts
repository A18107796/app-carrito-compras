import { GenericEntity } from "./generic-entity";

export abstract class Persona implements GenericEntity{

    id!: number;
    nombres!: string;
    dni!: string;
    direccion!: string;
    email!: string;
    telefono!: string;

}
