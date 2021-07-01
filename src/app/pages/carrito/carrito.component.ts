import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Compras } from 'src/app/models/compras';
import { DetalleCompras } from 'src/app/models/detalle-compras';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductoService } from 'src/app/services/producto.service';
import { url_spring } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  compras: Compras = new Compras();
  total: number = 0.00;
  constructor(public _cS: CarritoService, private _pS: ProductoService, private _compraService: ComprasService, private router: Router) { }
  public urlImage = url_spring + 'productos/uploads/img/'
  ngOnInit(): void {

  }



  realizarPago() {
    this._cS._carrito.productos.forEach(p => {
      let detalleCompras = new DetalleCompras();
      detalleCompras.cantidad = p.cantidad;
      detalleCompras.subtotal = (p.cantidad * p.producto.precio);
      detalleCompras.producto = p.producto;
      this.compras.detalles.push(detalleCompras);
    })
    this._compraService.saveCompra(this.compras).subscribe(
      res => {
        console.log(res);
        this._cS.cleanCarrito();
        this.router.navigateByUrl("/app/carta");
      },
      err => {
        console.error(err);
        Swal.fire('Error:', err.error.message, 'error');
        this.compras.detalles = [];
      }
    )

  }

  mensaje() {
    console.log(this._cS.getCarritoProductos());
  }

  changeCantidad(event: any, obj: Producto) {
    const cantidad = event.target.value
    this._cS.updateCantidad(obj, cantidad);
  }

  removeItem(id: number) {
    this._cS.removeProducto(id);
  }

  getStock(id: number): number {
    this._pS.getEntity(id).subscribe(res => {
      console.log(res);

    })
    return 10;
  }

}
