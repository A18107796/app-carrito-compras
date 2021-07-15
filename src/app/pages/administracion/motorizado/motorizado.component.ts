import { Component, OnInit } from '@angular/core';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motorizado',
  templateUrl: './motorizado.component.html',
  styleUrls: ['./motorizado.component.css']
})
export class MotorizadoComponent implements OnInit {
  compras: Compras[] = []
  constructor(private comprasService: ComprasService) { }

  ngOnInit(): void {
    this.comprasService.filtrarXEstado('PAGADO - Pedido en camino').subscribe(
      res => {
        this.compras = res;
      }
    )
  }

  enviarPedido(pedido: Compras) {
    Swal.fire({
      title: '¿Acabas de entregar el pedido ID:' + pedido.id + '?',
      text: 'Recuerda que si cambias el estado del pedido y el pedido no fue entregado tendras una sanción grave!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, entregue el pedido'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasService.updateEstadoCompra("PAGADO - Pedido Entregado", pedido.id).subscribe(
          res => {
            Swal.fire({
              title: 'HECHO',
              text: "El pedido fue registrado como ENTREGADO con exito.",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          },
          err => {
            console.log(err);
          }
        );
      }
    })

  }

}
