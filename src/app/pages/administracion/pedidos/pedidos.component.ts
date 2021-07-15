import { Component, OnInit } from '@angular/core';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  compras: Compras[] = [];
  constructor(
    private _compra: ComprasService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  sort() {
    this.compras.sort((a: Compras, b: Compras) => {
      return b.id - a.id;
    });
  }

  listar() {
    this._compra.getCompras().subscribe(
      res => {
        this.compras = res
        this.sort();
      }
    )
  }

  filtrarEnviosPendientes() {
    this._compra.filtrarXEstado("PAGADO - Envio Pendiente").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }
  filtrarEnviosEnviados() {
    this._compra.filtrarXEstado("PAGADO - Pedido Entregado").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }

  filtrarEnviosEnPreparacion() {
    this._compra.filtrarXEstado("PAGADO - Pedido en preparación").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }

  filtrarPedidosListos() {
    this._compra.filtrarXEstado("PAGADO - Pedido Listo, preparando para despachar").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }

  filtrarDepositosPendiente() {
    this._compra.filtrarXEstado("PAGO PENDIENTE - Espera de Deposito").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }

  filtrarRevisarDeposito() {
    this._compra.filtrarXEstado("DEPOSITO ENVIADO - Espera revision").subscribe(
      res => {
        this.compras = res;
        this.sort();

      }
    )
  }
}
