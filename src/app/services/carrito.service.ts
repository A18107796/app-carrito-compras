import { Injectable } from '@angular/core';
import { Carrito } from '../models/carrito';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public _carrito!: Carrito;

  constructor() {
    this.carrito;
  }

  public get carrito(): Carrito {
    if (this._carrito != null) {
      return this._carrito;
    } else if (
      this._carrito == null &&
      localStorage.getItem('carrito') != null &&
      localStorage.getItem('carrito_items') != null) {
      this._carrito = JSON.parse(localStorage.getItem('carrito') || '');
      this.carrito.productos = new Map(JSON.parse(localStorage.getItem('carrito_items') || ''));
      return this._carrito;
    }
    let carrito = new Carrito();
    carrito.cliente = 'Invitado';
    this._carrito = carrito;
    return this.carrito;
  }


  addItemtoCarrito(producto: Producto) {

    if (this._carrito.productos.get(producto.id)) {
      let cantidad = this._carrito.productos.get(producto.id)?.cantidad as number;
      this._carrito.productos.set(producto.id, { producto: producto, cantidad: cantidad + 1 })
    } else {
      this._carrito.productos.set(producto.id, { producto: producto, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    localStorage.setItem('carrito_items', JSON.stringify(Array.from(this.carrito.productos.entries())));
  }

  public getCarritoProductos() {
    return Array.from(this.carrito.productos.values());
  }

  getTotal() {
    let total: number = 0.00;
    this._carrito.productos.forEach(p => {
      total = total + (p.cantidad * p.producto.precio);
    })
    return total;
  }

  public getNItems(): number | 0 {
    return this._carrito.productos.size;
  }

  public removeProducto(key: number) {
    this._carrito.productos.delete(key);
    this.saveCarrito();
  }

  public updateCantidad(producto: Producto, cantidad: number) {
    this._carrito.productos.set(producto.id, { producto: producto, cantidad: cantidad });
    this.saveCarrito();
  }

  public saveCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    localStorage.setItem('carrito_items', JSON.stringify(Array.from(this.carrito.productos.entries())));
  }

  public cleanCarrito() {
    this._carrito = new Carrito();
    this.saveCarrito();
  }


}
