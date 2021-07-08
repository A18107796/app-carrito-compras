import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalLoginService {
  private _ocultarModal: boolean = true;
  constructor() { }


  getOcultarModal() {
    return this._ocultarModal;
  }


  abrirModal() {
    this._ocultarModal = false;
  }

  cerrarModal() {
    this._ocultarModal = true;
  }
}
