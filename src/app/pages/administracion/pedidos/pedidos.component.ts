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

  listar() {
    this._compra.getCompras().subscribe(
      res => {
        this.compras = res
      }
    )
  }

}
