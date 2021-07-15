import { Compras } from "./compras";
import { GenericEntity } from "./generic-entity";
import { Persona } from "./persona";

export class Cliente extends Persona{
    compras: Compras[] = [];

}
