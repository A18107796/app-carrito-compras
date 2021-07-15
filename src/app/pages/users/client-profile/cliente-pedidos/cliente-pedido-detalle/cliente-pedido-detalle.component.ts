import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Compras } from 'src/app/models/compras';
import { ComprasService } from 'src/app/services/compras.service';
import { url_spring } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-pedido-detalle',
  templateUrl: './cliente-pedido-detalle.component.html',
  styleUrls: ['./cliente-pedido-detalle.component.css']
})
export class ClientePedidoDetalleComponent implements OnInit {

  compra: Compras = new Compras();
  constructor(private _cService: ComprasService, private activatedRoute: ActivatedRoute, private router: Router, private _location: Location, public datePipe: DatePipe) { }
  img!: File;
  public urlImage = url_spring + 'productos/uploads/img/'
  ngOnInit(): void {

    this.getCompra();

  }


  getCompra() {
    this.activatedRoute.params.subscribe(
      params => {
        let idCompra = params['idPedido'] as number;
        if (idCompra && idCompra > 0) {
          this._cService.getCompra(idCompra).subscribe(
            res => {
              this.compra = res.compras;
              if (this.compra.tipo_pago === "Deposito" && this.compra.estado.includes("PENDIENTE")) {
                Swal.fire("Alerta", "El pedido aun no ha sigo pagado.  \nNecesita realizar un deposito al num de cuenta y subir el recibo.", 'warning')
              }
            },
            err => {
              this._location.back();
            }
          )
        } else {
          this._location.back();
        }
      })
  }

  seleccionarFoto(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];

      if (file.type.indexOf('image') < 0) {
        Swal.fire('Error', 'Debe seleccionar una imagen [.img, .jpg, .jpeg]', 'error');
      } else {
        this.img = file;
      }

    }
  }

  subirFoto() {
    Swal.fire({
      title: 'Subir recibo',
      text: "Recuerda que solo puedes subir el recibo una vez, si el recibo no es valido tu pedido será cancelado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, subir recibo.'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.img) {
          this._cService.uploadRecibo(this.img, this.compra.id).subscribe(
            res => {

              Swal.fire({
                title: 'Bien',
                text: "Recibo subido con exito, pronto se encargaran de revisar su pedido!",
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
              console.log(err.error.message);

            }
          );

        } else {
          Swal.fire('Información', 'No subio ninguna imagen.', 'warning')
        }
      }
    })
  }

  volver() {
    this._location.back();
  }

}
