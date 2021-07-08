import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/models/carrito';
import { Compras } from 'src/app/models/compras';
import { DetalleCompras } from 'src/app/models/detalle-compras';
import { Producto } from 'src/app/models/producto';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { ComprasService } from 'src/app/services/compras.service';
import { ModalLoginService } from 'src/app/services/modal-login.service';
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
  constructor(
    public _cS: CarritoService,
    private _pS: ProductoService,
    private _compraService: ComprasService,
    private router: Router,
    private authService: AuthService,
    private modalService: ModalLoginService) { }

  public urlImage = url_spring + 'productos/uploads/img/'
  ngOnInit(): void {

  }



  realizarPago() {

    if (!this.authService.isAuthenticated()) {
      Swal.fire({
        title: 'Usted no se encuentra logeado :(',
        text: "Inicie Sesión para proceder al pago de sus productos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Después',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/app', { outlets: { 'modal': ['a', 'view1'] } }]);
        }
      })
    } else {
      console.log("LOGEADO");
      this.modalService.abrirModal();
      /*       this._cS._carrito.productos.forEach(p => {
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
            ) */
    }



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

  disabled() {
    if (this._cS._carrito.productos.size > 0) {
      return false;
    } else {
      return true;
    }
  }

}
