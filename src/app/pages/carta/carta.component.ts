import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { CarritoService } from 'src/app/services/carrito.service';
import { ProductoService } from 'src/app/services/producto.service';
import { url_spring } from 'src/environments/environment';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {
  productos: Producto[] = [];
  urlImg = url_spring + 'productos/uploads/img/';
  public textFilter: string = " ";
  public enOferta: boolean = false;
  constructor(
    private _pS: ProductoService,
    public _carritoS: CarritoService,
    private _toastS: ToastrService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this._pS.listar().subscribe(res => {
      this.productos = res;
      console.log(res);
    })
  }

  addToCarrito(producto: Producto) {
    this._carritoS.addItemtoCarrito(producto);
    this._toastS.success(producto.nombres.toUpperCase(), 'Producto añadido al carrito', {timeOut: 700});
  }

  filter(event: any | null) {
    this.productos = [];
    this.textFilter = event.target.value.toString();
    if (this.textFilter.length == 0) {
      this.textFilter = " ";
    }
    this._pS.filterProductos(this.textFilter, this.enOferta).subscribe(res => {
      this.productos = res;
    })
  }

  filterByOferta(event: any) {
    this.enOferta = event.target.checked;
    if (this.textFilter.length == 0) {
      this.textFilter = " ";
    }
    this._pS.filterProductos(this.textFilter, this.enOferta).subscribe(res => {
      this.productos = res;
    })
  }



}
