import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { url_spring } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carta-detail',
  templateUrl: './carta-detail.component.html',
  styleUrls: ['./carta-detail.component.css']
})
export class CartaDetailComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private _pS: ProductoService, public _carritoS: CarritoService, private _toastS: ToastrService) { }
  urlImg = url_spring + 'productos/uploads/img/';
  producto: Producto = new Producto();
  cantidad: number = 1;
  ngOnInit(): void {
    this.getPlato();
  }

  getPlato() {
    this.activatedRoute.params.subscribe(param => {
      let id = param['id'] as number;
      console.log(id);
      if (id && id > 0) {
        this._pS.getEntity(id).subscribe(
          res => {
            this.producto = res.producto;
          }, err => {
            this.router.navigate(['/app/carta']);
          }
        )
      } else {
        this.router.navigate(['/app/carta']);
      }
    })
  }


  addToCarrito(producto: Producto) {
    if (this.cantidad > 0) {
      this._carritoS.addItemtoCarritoWithStock(producto, this.cantidad);
      this._toastS.success(producto.nombres.toUpperCase(), 'Producto añadido al carrito', { timeOut: 1000 });

    } else {
      this._toastS.error(producto.nombres.toUpperCase(), 'Ingrese una cantidad mayor que 0 al carrito.', { timeOut: 1000 });

    }
  }
  updateCantidad(event: any) {

    this.cantidad = event.target.value as number;
    console.log(this.cantidad);

  }
}
