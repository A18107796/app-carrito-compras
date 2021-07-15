import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras.service';
import { url_spring } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adm-pedido',
  templateUrl: './adm-pedido.component.html',
  styleUrls: ['./adm-pedido.component.css']
})
export class AdmPedidoComponent implements OnInit {
  compra: Compras = new Compras();
  constructor(private comprasService: ComprasService, private router: Router, private activatedRouter: ActivatedRoute, private location: Location) { }
  urlDownloadImg = url_spring + 'compras/uploads/img/';
  ngOnInit(): void {
    this.buscarPedido();
  }

  buscarPedido() {
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['idPedido'] as number;
        if (id && id > 0) {
          this.comprasService.getCompra(id).subscribe(
            res => {
              this.compra = res.compras;
            },
            err => {
              this.location.back();
            }
          )
        } else {
          this.location.back();
        }

      }
    )
  }


  validarPago() {
    Swal.fire({
      title: '¿Estas seguro que deseas validar este pago?',
      text: "Recuerda que al validar este pago, asumes la responsabilidad de que este deposito existe en las cuentas de la empresa.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Validar Pago'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasService.updateEstadoCompra("PAGADO - Envio Pendiente", this.compra.id).subscribe(
          res => {
            Swal.fire({
              title: 'HECHO',
              text: "El pago a sido validado, recuerda comandar este pedido.",
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
        )
      }
    })
  }

  comandarPedido() {
    Swal.fire({
      title: '¿Estas seguro que deseas enviar pedido a cocina?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasService.updateEstadoCompra("PAGADO - Pedido en preparación", this.compra.id).subscribe(
          res => {
            Swal.fire({
              title: 'HECHO',
              text: "Pedido enviado a cocina, espere su preparación.",
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
  enviarPedido() {
    Swal.fire({
      title: '¿El pedido se encuentra en envio?',
      text: 'El motorizado partio con el pedido ID: ' + this.compra.id + '?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasService.updateEstadoCompra("PAGADO - Pedido en camino", this.compra.id).subscribe(
          res => {
            Swal.fire({
              title: 'HECHO',
              text: "Pedido en camino, el motorizado se encargara de entregar el pedido al cliente: " + this.compra.cliente.nombres,
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

  preparacionCulminada() {
    Swal.fire({
      title: '¿El cocinero entrego el pedido?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.comprasService.updateEstadoCompra("PAGADO - Pedido Listo, preparando para despachar", this.compra.id).subscribe(
          res => {
            Swal.fire({
              title: 'HECHO',
              text: "Pedido enviado a cocina, espere su preparación.",
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
