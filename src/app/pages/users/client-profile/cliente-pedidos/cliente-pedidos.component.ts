import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { Compras } from 'src/app/models/compras';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-pedidos',
  templateUrl: './cliente-pedidos.component.html',
  styleUrls: ['./cliente-pedidos.component.css']
})
export class ClientePedidosComponent implements OnInit {

  cliente: Cliente = new Cliente();;
  constructor(private auth: AuthService, private _cS: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos() {
    let id = this.auth.usuario.cliente?.id;
    this._cS.getEntity(id).subscribe(
      res => {
        this.cliente = res.cliente;
        this.cliente.compras.sort((a: Compras, b: Compras) => {
          return b.id - a.id;
        });

      },
      err => {
        this.router.navigate(['app/home']);
        this.auth.logout();
      }
    );
  }

}
